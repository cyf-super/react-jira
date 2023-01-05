import { FullpageErrorFallback, FullPageLoading } from "components/lib";
import React, { ReactNode, useState } from "react";
import { isError } from "react-query";
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

const AuthContext = React.createContext<
  | {
      user: auth.User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    data: user,
    setData: setUser,
    isIdle,
    isLoading,
    error,
  } = useAsync<auth.User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });
  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  if (error) {
    return <FullpageErrorFallback error={error}></FullpageErrorFallback>;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    ></AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须再AuthProvider中使用");
  }
  return context;
};
