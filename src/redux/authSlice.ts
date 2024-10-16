import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
    user: null | { email: string };
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string }>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
});

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

export const { setUser, clearUser, setAuthError, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
