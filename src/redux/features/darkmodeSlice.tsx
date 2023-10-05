import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type darkmodeState = boolean;

const initialState: darkmodeState = false;

const darkmodeSlice = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    setDarkmode: (state, action: PayloadAction<darkmodeState>) => {
      return action.payload;
    },
  },
});

export const { setDarkmode } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
