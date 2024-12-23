import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./features/api/productApi";
import userSlice from './features/api/userSlice'

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        userSlice: userSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
})