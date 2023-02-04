import { AppDidpatch, RootState } from "./index";
import { createSlice } from "@reduxjs/toolkit";
import { User, AuthForm } from "./../auto-provider";
import * as auth from "auto-provider";
import { bootstrapUser } from "context/auth-context";

interface State {
  uses: User | null;
}

const initialState: State = {
  uses: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.uses = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.uses;

export const login = (form: AuthForm) => (dispatch: AppDidpatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const register = (form: AuthForm) => (dispatch: AppDidpatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDidpatch) =>
  auth.logout().then(() => dispatch(setUser(null)));

// 有token自动登陆
export const boostrap = () => (dispath: AppDidpatch) =>
  bootstrapUser().then((user) => dispath(setUser(user)));
