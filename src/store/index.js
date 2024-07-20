import { configureStore } from "@reduxjs/toolkit";
import appStoreReducer from "./reducers";

export const store = configureStore({
    reducer: {
        appStore: appStoreReducer,
    },
});
