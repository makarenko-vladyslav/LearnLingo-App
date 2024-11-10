interface FirebaseAuthError extends Error {
    code: string;
    message: string;
    errors?: { message: string; domain: string; reason: string }[];
}

export function isFirebaseAuthError(error: unknown): error is FirebaseAuthError {
    return typeof error === "object" && error !== null && "code" in error;
}

export function getFirebaseAuthErrorMessage(error: FirebaseAuthError): string {
    const errorCode = error.code || error.errors?.[0]?.message || error.message;

    switch (errorCode) {
        case "auth/email-already-in-use":
            return "This email is already registered.";
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password.";
        case "auth/user-not-found":
            return "No user found with this email.";
        case "auth/too-many-requests":
            return "Too many attempts. Try again later.";
        case "auth/invalid-email":
            return "Enter a valid email.";
        default:
            return "An error occurred. Try again.";
    }
}
