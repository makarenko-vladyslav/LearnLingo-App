"use client";

import { useEffect } from "react";
import Modal from "react-modal";
import { Teacher } from "../../redux/teachersSlice";
import LoginAndRegisterForm from "../Forms/LoginAndRegisterForm";

interface UniversalModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    content?: React.ReactNode;
    title?: string;
    description?: string;
    formMode?: "login" | "register";
    teacher?: Teacher;
}

export default function UniversalModal({
    isOpen,
    onRequestClose,
    content,
    title,
    description,
    formMode,
}: UniversalModalProps) {
    useEffect(() => {
        if (typeof document !== "undefined") {
            Modal.setAppElement("#__next");
        }

        return () => {};
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            contentLabel={title || (formMode === "login" ? "Log In" : "Registration")}
            overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            className="bg-white p-8 sm:p-16 rounded-lg shadow-lg relative max-w-[556px] w-full mx-4 sm:mx-auto max-h-[99vh] overflow-y-auto">
            <h1 className="font-medium text-[2.5rem] mb-5 leading-[120%] tracking-[-0.02em]">
                {title || (formMode === "login" ? "Log In" : "Registration")}
            </h1>

            {description ? (
                <p className="leading-[137%] mb-5 text-text80">{description}</p>
            ) : formMode === "login" ? (
                <p className="leading-[137%] mb-5 text-text80">
                    Welcome back! Please enter your credentials to access your account and continue your search for a
                    teacher.
                </p>
            ) : (
                <p className="leading-[137%] mb-5 text-text80">
                    Thank you for your interest in our platform! In order to register, we need some information. Please
                    provide us with the following information.
                </p>
            )}

            <button
                className="absolute top-3 right-5 text-3xl z-10"
                onClick={onRequestClose}>
                &times;
            </button>

            {content ? (
                content
            ) : (
                <LoginAndRegisterForm
                    onRequestClose={onRequestClose}
                    mode={formMode ?? "login"}
                />
            )}
        </Modal>
    );
}
