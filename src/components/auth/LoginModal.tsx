import { useEffect } from "react";
import Modal from "react-modal";
import LoginAndRegisterForm from "../Forms/LoginAndRegisterForm";

interface LoginModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    formMode: "login" | "register" | null;
}

export default function LoginModal({ isOpen, onRequestClose, formMode }: LoginModalProps) {
    useEffect(() => {
        Modal.setAppElement("#__next");

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            contentLabel="Login and Registration Modal"
            overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            className="bg-white p-16 rounded-lg shadow-lg relative max-w-[556px] mx-auto">
            {formMode === "login" ? (
                <>
                    <h1 className="font-med text-[2.5rem] mb-5 leading-[120%]">Log In</h1>
                    <p className="leading-[137%] mb-10 text-text80">
                        Welcome back! Please enter your credentials to access your account and continue your search for
                        a teacher.
                    </p>
                </>
            ) : (
                <>
                    <h1 className="font-med text-[2.5rem] mb-5 leading-[120%]">Registration</h1>
                    <p className="leading-[137%] mb-10 text-text80">
                        Thank you for your interest in our platform! In order to register, we need some information.
                        Please provide us with the following information.
                    </p>
                </>
            )}

            <button
                className="absolute top-3 right-5 text-3xl"
                onClick={onRequestClose}>
                &times;
            </button>

            <LoginAndRegisterForm
                onRequestClose={onRequestClose}
                mode={formMode ?? "login"}
            />
        </Modal>
    );
}
