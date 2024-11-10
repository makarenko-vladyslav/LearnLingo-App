import Cookies from "js-cookie";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    getIdToken,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { AppDispatch } from "../store";
import { isFirebaseAuthError, getFirebaseAuthErrorMessage } from "../../utils/firebaseErrorHandler";
import { setUser, clearUser } from "../slices/authSlice";
import { clearFavoriteTeachers } from "../slices/teachersSlice";
import { fetchFavoriteTeachers } from "./teachersActions";

export const handleAuth = createAsyncThunk<
    { email: string },
    { mode: "login" | "register"; email: string; password: string; name?: string },
    { rejectValue: string }
>("auth/handleAuth", async ({ mode, email, password, name }, { rejectWithValue }) => {
    try {
        let userCredential;
        if (mode === "register") {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (name) await updateProfile(userCredential.user, { displayName: name });
        } else {
            userCredential = await signInWithEmailAndPassword(auth, email, password);
        }
        const token = await getIdToken(userCredential.user);
        Cookies.set("authToken", token, { expires: 1 });
        return { email: userCredential.user.email! };
    } catch (error) {
        if (isFirebaseAuthError(error)) {
            return rejectWithValue(getFirebaseAuthErrorMessage(error));
        }
        return rejectWithValue("An unknown error occurred. Please try again.");
    }
});

export const handleLogout = createAsyncThunk<void, void, { dispatch: AppDispatch; rejectValue: string }>(
    "auth/logout",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            await signOut(auth);
            Cookies.remove("authToken");
            dispatch(clearUser());
            dispatch(clearFavoriteTeachers());
        } catch (error) {
            console.log(error);

            return rejectWithValue("Logout error. Please try again.");
        }
    }
);

export const resetPassword = createAsyncThunk<void, string, { rejectValue: string }>(
    "auth/resetPassword",
    async (email, { rejectWithValue }) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            let errorMessage = "Password reset failed.";
            if (isFirebaseAuthError(error)) {
                errorMessage = getFirebaseAuthErrorMessage(error);
            }
            return rejectWithValue(errorMessage);
        }
    }
);

export const subscribeToAuthState = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
    "auth/subscribeToAuthState",
    async (_, { dispatch }) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await getIdToken(user);
                Cookies.set("authToken", token, { expires: 1 });
                dispatch(setUser({ email: user.email! }));
                dispatch(fetchFavoriteTeachers());
            } else {
                dispatch(clearUser());
                dispatch(clearFavoriteTeachers());
                Cookies.remove("authToken");
            }
        });
    }
);
