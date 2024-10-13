import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface AuthState {
    user: null | { email: string };
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
};

export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { dispatch }) => {
    const auth = getAuth();
    return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({ email: user.email! }));
            } else {
                dispatch(clearUser());
            }
            resolve();
        });
    });
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ email: string }>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(checkAuthStatus.fulfilled, (state) => {});
    // },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
