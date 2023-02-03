import { useMountedRef } from "./index";
import { useState, useReducer, useCallback } from "react";
interface State<T> {
  error: Error | null;
  data: T | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [mountedRef, dispatch]
  );
};

export const useAsync = <T>(
  initialState?: State<T>,
  initConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initConfig };
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => {});

  // 数据请求成功
  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        data: null,
        stat: "error",
        error,
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (
      promise: Promise<T>,
      runConfig?: {
        retry: () => Promise<T>;
      }
    ) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }

      setRetry(() => () => {
        console.log("set retry");
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      // TODO：setState函数格式 解决依赖循环问题
      safeDispatch({ stat: "loading" });
      return promise
        .then((data) => {
          // 组件挂在才设置setData，防止请求过程中登出报错
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          // catch会自己消化error，需要自己手动抛出来
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    ...state,
    retry,
  };
};
