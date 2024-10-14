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

interface FormData {
    email: string;
    password: string;
    name?: string;
}

// Реєстрація або логін користувача
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

// Логаут користувача
export const handleLogout = async (dispatch: AppDispatch, router: ReturnType<typeof useRouter>) => {
    try {
        await signOut(auth);
        dispatch(clearUser());
        router.push("/");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

// Підписка на зміну стану автентифікації
export const subscribeToAuthState = (dispatch: AppDispatch) => {
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setUser({ email: user.email! }));
        } else {
            dispatch(clearUser());
        }
    });
};

// Функція для перевірки, чи користувач залогований
export const isAuthenticated = (): boolean => {
    return !!auth.currentUser;
};
