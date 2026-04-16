import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "../features/images/imagesSlice";
import { loadImages } from "../services/storage/localStorageService";
import { saveImages } from "../services/storage/localStorageService";

const preloadedImages = loadImages();

export const store = configureStore({
  reducer: {
    images: imagesReducer,
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