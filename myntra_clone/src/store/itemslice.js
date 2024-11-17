import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addinitialitem: (state, action) => {
      return action.payload;
    },
    searchitem: (state, action) => {
      return state.filter(
        (item) =>
          item.item_name.toLowerCase().includes(action.payload.toLowerCase()) ||
          item.company.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});
export const itemAction = itemSlice.actions;
export default itemSlice;
