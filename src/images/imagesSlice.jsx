import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
};

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImage(state, action) {
      state.images.push(action.payload);
    },

    deleteImage(state, action) {
      state.images = state.images.filter(
        (img) => img.id !== action.payload
      );
    },

    renameImage(state, action) {
      const { id, name } = action.payload;

      const image = state.images.find((img) => img.id === id);
      if (image) {
        image.name = name;
      }
    },

    setImages(state, action) {
      state.images = action.payload;
    },
  },
});

export const {
  addImage,
  deleteImage,
  renameImage,
  setImages,
} = imagesSlice.actions;

export default imagesSlice.reducer;