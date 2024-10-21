import { useRouter } from "next/navigation";
import { auth } from "../../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
import { AppDispatch } from "../redux/store";
import { setUser, clearUser, setAuthError, setLoading } from "../redux/authSlice";
import { clearFavoriteTeachers } from "../redux/teachersSlice";
import { loadFavoriteTeachers } from "./favoritesService";

interface FormData {
    email: string;
    password: string;
    name?: string;
}

export const handleAuth =
    (mode: "login" | "register", data: FormData, router: ReturnType<typeof useRouter>) =>
    async (dispatch: AppDispatch) => {
        try {
            let userCredential;
            if (mode === "register") {
                userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
                await updateProfile(userCredential.user, { displayName: data.name! });
            } else {
                userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            }
            dispatch(setUser({ email: userCredential.user.email! }));
            dispatch(setAuthError(""));
            router.push("/teachers");
        } catch (error: any) {
            let errorMessage = "An error occurred. Please try again.";
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "This email is already in use.";
                    break;
                case "auth/invalid-credential":
                    errorMessage = "Wrong password.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Wrong password.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "User not registered.";
                    break;
                case "auth/too-many-requests":
                    errorMessage =
                        "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or try again later.";
                    break;
                default:
                    errorMessage = "An unknown error occurred.";
                    break;
            }
            dispatch(setAuthError(errorMessage));
        }
    };

export const handleLogout = async (dispatch: AppDispatch, router: ReturnType<typeof useRouter>) => {
    try {
        await signOut(auth);
        dispatch(clearUser());
        dispatch(clearFavoriteTeachers());
        router.push("/");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const resetPassword = (email: string) => async (dispatch: AppDispatch) => {
    try {
        await sendPasswordResetEmail(auth, email);
        dispatch(setAuthError(""));
    } catch (error: any) {
        let errorMessage = "Something went wrong. Please try again.";
        switch (error.code) {
            case "auth/invalid-email":
                errorMessage = "Invalid email address.";
                break;
            case "auth/user-not-found":
                errorMessage = "No user found with this email.";
                break;
        }
        dispatch(setAuthError(errorMessage));
    }
};

export const subscribeToAuthState = (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            dispatch(setUser({ email: user.email! }));

            try {
                await loadFavoriteTeachers(dispatch);
            } catch (error) {
                console.error("Failed to load favorite teachers:", error);
            }
        } else {
            dispatch(clearUser());
        }

        dispatch(setLoading(false));
    });
};

export const isAuthenticated = (): boolean => {
    return !!auth.currentUser;
};
