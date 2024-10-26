import React from "react";
import UniversalModal from "./UniversalModal";
import LoginAndRegisterForm from "../Forms/LoginAndRegisterForm";

interface AuthModalProps {
    isModalOpen: boolean;
    formMode: "login" | "register" | null;
    handleCloseModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isModalOpen, formMode, handleCloseModal }) => {
    return formMode === "login" ? (
        <UniversalModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            title="Log In"
            description="Welcome back! Please enter your credentials to access your account and continue your search for a teacher."
            content={
                <LoginAndRegisterForm
                    onRequestClose={handleCloseModal}
                    mode="login"
                />
            }
        />
    ) : (
        <UniversalModal
            isOpen={isModalOpen}
            onRequestClose={handleCloseModal}
            title="Registration"
            description="Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information."
            content={
                <LoginAndRegisterForm
                    onRequestClose={handleCloseModal}
                    mode="register"
                />
            }
        />
    );
};

export default AuthModal;
