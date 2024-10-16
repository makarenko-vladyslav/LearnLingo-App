import { auth } from "../../firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { setUser, clearUser } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import { useRouter } from "next/navigation";
import { loadFavoriteTeachers } from "./favoritesService";

interface FormData {
    email: string;
    password: string;
    name?: string;
}

export const handleAuth = async (
    mode: "login" | "register",
    data: FormData,
    dispatch: AppDispatch,
    router: ReturnType<typeof useRouter>
) => {
    try {
        let userCredential;
        if (mode === "register") {
            userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(userCredential.user, { displayName: data.name! });
        } else {
            userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        }
        dispatch(setUser({ email: userCredential.user.email! }));
        router.push("/teachers");
    } catch (error) {
        console.error("Authentication error:", error);
    }
};

export const handleLogout = async (dispatch: AppDispatch, router: ReturnType<typeof useRouter>) => {
    try {
        await signOut(auth);
        dispatch(clearUser());
        router.push("/");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

export const subscribeToAuthState = (dispatch: AppDispatch) => {
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
    });
};

export const isAuthenticated = (): boolean => {
    return !!auth.currentUser;
};
