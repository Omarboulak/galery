import { configureStore } from "@reduxjs/toolkit";
import galerySlice from "./GalerySlice"; 

const store = configureStore({
  reducer: {
    galery: galerySlice, 
  },
});

export default store;
