import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleAuth, handleLogout, resetPassword } from "../actions/authActions";

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
    extraReducers: (builder) => {
        builder
            .addCase(handleAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(handleAuth.rejected, (state, action) => {
                state.error = action.payload || "An error occurred.";
            })
            .addCase(handleLogout.rejected, (state, action) => {
                state.error = action.payload || "An error occurred.";
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.error = action.payload || "An error occurred.";
            });
    },
});

export const { setUser, clearUser, setAuthError, clearAuthError, setLoading } = authSlice.actions;

export default authSlice.reducer;
