import { FullpageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "store/auth.slice";
import { useAsync } from "utils/use-async";
import * as auth from "../auto-provider";
import { useMount } from "../utils";
import { http } from "../utils/http";

interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, isIdle, isLoading, error } = useAsync<auth.User | null>();

  const dispatch: (...args: any[]) => Promise<auth.User> = useDispatch();

  useMount(
    useCallback(() => run(dispatch(authStore.boostrap())), [run, dispatch])
  );
  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  if (error) {
    return <FullpageErrorFallback error={error}></FullpageErrorFallback>;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: any[]) => Promise<auth.User> = useDispatch();
  // 返回方法和对象 使用useCallBack
  const user = useSelector(authStore.selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );

  return {
    user,
    login,
    logout,
    register,
  };
};
