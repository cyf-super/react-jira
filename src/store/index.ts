import { authSlice } from "./auth.slice";
import { projectListSlice } from "./../screens/project-list/project-list.slice";
import { configureStore } from "@reduxjs/toolkit";

export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDidpatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
