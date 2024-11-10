import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import teachersReducer from "./slices/teachersSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        teachers: teachersReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["auth/subscribeToAuthState/fulfilled", "auth/handleLogout/fulfilled"],
                ignoredPaths: ["auth.subscribeToAuthState.payload"],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
