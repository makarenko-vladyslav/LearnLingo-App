import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import teachersReducer from "./teachersSlice";
import filtersReducer from "./filtersSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teachers: teachersReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
