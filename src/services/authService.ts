import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setUser } from "../redux/authSlice";
import { AppDispatch } from "../redux/store";
import { useRouter } from "next/navigation";

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
            alert("Registration successful");
        } else {
            userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            alert("Login successful");
        }
        dispatch(setUser({ email: userCredential.user.email! }));
        router.push("/");
    } catch (error) {
        console.error("Authentication error:", error);
        alert("Authentication failed");
    }
};
