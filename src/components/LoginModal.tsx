"use client";

import Modal from "react-modal";
import LoginAndRegisterForm from "./LoginAndRegisterForm";

interface LoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    formMode: "login" | "register" | null;
}

export default function LoginModal({ isOpen, onRequestClose, formMode }: LoginModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Login and Registration Modal"
            overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            className="bg-white p-16 rounded-lg shadow-lg relative max-w-[556px] mx-auto">
            {formMode === "login" ? (
                <>
                    <h1 className="font-bold text-[2.5rem] mb-5 leading-[120%]">Log In</h1>
                    <p className="leading-[137%] mb-10 text-text80">
                        Welcome back! Please enter your credentials to access your account and continue your search for
                        an teacher.
                    </p>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-[2.5rem] mb-5 leading-[120%]">Registration</h1>
                    <p className="leading-[137%] mb-10 text-text80">
                        Thank you for your interest in our platform! In order to register, we need some information.
                        Please provide us with the following information
                    </p>
                </>
            )}

            <button
                className="absolute top-3 right-5 text-3xl"
                onClick={onRequestClose}>
                &times;
            </button>

            <LoginAndRegisterForm mode={formMode ?? "login"} />
        </Modal>
    );
}
