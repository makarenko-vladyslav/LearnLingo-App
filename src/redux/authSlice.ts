import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AuthState {
    user: null | { email: string };
    isAuthenticated: boolean;
    error: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    error: null,
    loading: true,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string }>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
            state.loading = false;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
            state.loading = false;
        },
        setAuthError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const selectAuthError = (state: RootState) => state.auth.error;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectUser = (state: RootState) => state.auth.user;

export const { setUser, clearUser, setAuthError, clearAuthError, setLoading } = authSlice.actions;
export default authSlice.reducer;
