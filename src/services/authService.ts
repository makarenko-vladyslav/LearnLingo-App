import { useRouter } from "next/navigation";
import { auth } from "../../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    getIdToken,
} from "firebase/auth";
import { AppDispatch } from "../redux/store";
import { setUser, clearUser, setAuthError, setLoading } from "../redux/authSlice";
import { clearFavoriteTeachers } from "../redux/teachersSlice";
import { loadFavoriteTeachers } from "./favoritesService";
import Cookies from "js-cookie";

interface FormData {
    email: string;
    password: string;
    name?: string;
}

interface FirebaseAuthError extends Error {
    code: string;
}

function isFirebaseAuthError(error: unknown): error is FirebaseAuthError {
    return typeof error === "object" && error !== null && "code" in error;
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

            const token = await getIdToken(userCredential.user);
            Cookies.set("authToken", token, { expires: 1 });

            dispatch(setUser({ email: userCredential.user.email! }));
            dispatch(setAuthError(""));
            router.push("/teachers");
        } catch (error) {
            let errorMessage = "An error occurred. Please try again.";

            if (isFirebaseAuthError(error)) {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        errorMessage = "This email is already in use.";
                        break;
                    case "auth/invalid-credential":
                    case "auth/wrong-password":
                        errorMessage = "Invalid password.";
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
            }
            dispatch(setAuthError(errorMessage));
        }
    };

export const handleLogout = async (dispatch: AppDispatch, router: ReturnType<typeof useRouter>) => {
    try {
        await signOut(auth);
        dispatch(clearUser());
        dispatch(clearFavoriteTeachers());

        Cookies.remove("authToken");

        router.push("/");
    } catch (error) {
        if (error instanceof Error) {
            console.error("Logout error:", error.message);
        }
    }
};

export const resetPassword = (email: string) => async (dispatch: AppDispatch) => {
    try {
        await sendPasswordResetEmail(auth, email);
        dispatch(setAuthError(""));
    } catch (error) {
        let errorMessage = "Something went wrong. Please try again.";

        if (isFirebaseAuthError(error)) {
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage = "Invalid email address.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "No user found with this email.";
                    break;
            }
        }

        dispatch(setAuthError(errorMessage));
    }
};

export const subscribeToAuthState = (dispatch: AppDispatch) => {
    dispatch(setLoading(true));

    return onAuthStateChanged(auth, async (user) => {
        if (user) {
            const token = await getIdToken(user);
            Cookies.set("authToken", token, { expires: 1 });

            dispatch(setUser({ email: user.email! }));

            try {
                await loadFavoriteTeachers(dispatch);
            } catch (error) {
                console.error("Failed to load favorite teachers:", error);
            }
        } else {
            dispatch(clearUser());
            Cookies.remove("authToken");
        }

        dispatch(setLoading(false));
    });
};

export const isAuthenticated = (): boolean => {
    const token = Cookies.get("authToken");
    return !!token;
};
