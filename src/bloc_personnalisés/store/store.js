import { configureStore } from "@reduxjs/toolkit";
import blocsSlice from "./slices/blocsSlice";

const store = configureStore({
    reducer : {
        blocs: blocsSlice
    }
})

export default store