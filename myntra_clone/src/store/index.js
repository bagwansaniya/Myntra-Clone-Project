import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "./itemslice";
import FetchingdataSlice from "./fetchingdataslice";
import BagSlice from "./bagSlice";

const myntrastore = configureStore({
  reducer: {
    items: itemSlice.reducer,
    Fetchdata: FetchingdataSlice.reducer,
    Bagdata: BagSlice.reducer,
  },
});
export default myntrastore;
