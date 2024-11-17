import { createSlice } from "@reduxjs/toolkit";

const FetchingdataSlice = createSlice({
  name: "Fetchdata",
  initialState: { fetcheddata: false, fetchdone: false },
  reducers: {
    markdone: (state) => {
      console.log("Action: markdone triggered");
      state.fetcheddata = true;
    },
    fetchdonecompleted: (state) => {
      console.log("Action: fetchdonecompleted triggered");
      state.fetchdone = true;
    },
    fetchdoneincompleted: (state) => {
      console.log("Action: fetchdoneincompleted triggered");
      state.fetchdone = false;
    },
  },
});
export const FetchdataAction = FetchingdataSlice.actions;
export default FetchingdataSlice;
