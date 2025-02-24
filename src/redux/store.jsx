import { configureStore } from "@reduxjs/toolkit";
import galerySlice from "./GalerySlice"; 
import favouriteReducer from "./favouriteSlice";

const store = configureStore({
  reducer: {
    galery: galerySlice, 
    favourites: favouriteReducer,
  },
});

export default store;
