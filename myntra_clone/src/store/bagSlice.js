import { createSlice } from "@reduxjs/toolkit";

const BagSlice = createSlice({
  name: "Bagdata",
  initialState: ["001", "002"],
  reducers: {
    AdditemtoBag: (state, action) => {
      state.push(action.payload);
    },
    RemoveitemBag: (state, action) => {
      return state.filter((item) => item !== action.payload);
    },
  },
});
export const BagAction = BagSlice.actions;
export default BagSlice;
