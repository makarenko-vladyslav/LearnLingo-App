"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { resetPassword } from "../../redux/actions/authActions";

interface PasswordResetProps {
    email: string;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ email }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [resetEmailSent, setResetEmailSent] = useState(false);
    const [emailRequired, setEmailRequired] = useState(false);

    async function handleForgotPassword() {
        if (email) {
            await dispatch(resetPassword(email));
            setResetEmailSent(true);
            setEmailRequired(false);
            setTimeout(() => setResetEmailSent(false), 7000);
        } else {
            setEmailRequired(true);
            setTimeout(() => setEmailRequired(false), 7000);
        }
    }

    return (
        <div className="flex justify-between items-center text-sm mb-4">
            {resetEmailSent ? (
                <span className="text-green">Password reset email sent, check your email!</span>
            ) : (
                <span className="text-red-600">{emailRequired && "Please enter your email address."}</span>
            )}

            <button
                type="button"
                onClick={handleForgotPassword}
                className="text-blue-600 hover:underline ml-auto">
                Forgot password?
            </button>
        </div>
    );
};

export default PasswordReset;
