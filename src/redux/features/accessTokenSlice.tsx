import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type accessTokenState = string;

const initialState: accessTokenState = "";

const accessTokenSlice = createSlice({
  name: "logged",
  initialState,
  reducers: {
    setAccessTokenStore: (state, action: PayloadAction<accessTokenState>) => {
      return action.payload;
    },
  },
});

export const { setAccessTokenStore } = accessTokenSlice.actions;
export default accessTokenSlice.reducer;
