import { useMountedRef } from "./index";
import { useState, useCallback } from "react";
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

export const useAsync = <T>(
  initialState?: State<T>,
  initConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, initConfig };
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  const [retry, setRetry] = useState(() => () => {});

  // 数据请求成功
  const setData = useCallback(
    (data: T) =>
      setState({
        data,
        stat: "success",
        error: null,
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      setState({
        data: null,
        stat: "error",
        error,
      }),
    []
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
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          // 组件挂在才设置setData，防止请求过程中登出报错
          mountedRef.current && setData(data);
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
    [config.throwOnError, mountedRef, setData, setError]
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
