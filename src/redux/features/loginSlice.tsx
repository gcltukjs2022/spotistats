import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type loginState = boolean;

const initialState: loginState = false;

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogin: (_, action: PayloadAction<loginState>) => {
      return action.payload;
    },
    resetLogin: () => {
      return initialState;
    },
  },
});

export const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
