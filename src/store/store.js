import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./slices/imagesSlice";
import blocsSlice from "./slices/blocsSlice";
import { loadImages } from "../services/storage/localStorageService";
import { saveImages } from "../services/storage/localStorageService";

const preloadedImages = loadImages();

const store = configureStore({
  reducer: {
    images: imagesReducer,
    blocs: blocsSlice
  },
  preloadedState: {
    images: {
      images: preloadedImages,
    },
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveImages(state.images.images);
});

export default store;