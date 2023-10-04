import { configureStore } from "@reduxjs/toolkit";
import darkmodeSlice from "./features/darkmodeSlice";

import loginSlice from "./features/loginSlice";

import accessTokenSlice from "./features/accessTokenSlice";

const store = configureStore({
  reducer: {
    darkmode: darkmodeSlice,
    accessToken: accessTokenSlice,
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
