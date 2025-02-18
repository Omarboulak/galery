import { configureStore } from "@reduxjs/toolkit";
import galerySlice from "./GalerySlice"; // Importamos el slice

const store = configureStore({
  reducer: {
    galery: galerySlice, // Agregamos el slice al store
  },
});

export default store;
