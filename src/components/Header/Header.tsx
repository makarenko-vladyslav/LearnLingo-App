"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectAuthLoading } from "../../redux/authSlice";
import { handleLogout } from "../../services/authService";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import UniversalModal from "../UniversalModal";
import FavoriteBtn from "../FavoriteBtn";
import LoginAndRegisterForm from "../Forms/LoginAndRegisterForm";
import { ThemeSwitcher } from "../ThemeSwitcher";
import Burger from "./Burger";

export default function Header() {
    const [formMode, setFormMode] = useState<"login" | "register" | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);

    const handleOpenModal = (mode: "login" | "register") => {
        setFormMode(mode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormMode(null);
    };

    const handleOnLogout = () => {
        handleLogout(dispatch, router);
    };

    if (loading) return null;

    return (
        <header className="container flex justify-between items-center px-6 py-5 xl:px-32">
            <Logo />

            <NavLinks />

            <div className="flex justify-center items-center">
                <ThemeSwitcher />

                {isAuthenticated && <FavoriteBtn />}

                <AuthButtons
                    isAuthenticated={isAuthenticated}
                    handleOpenModal={handleOpenModal}
                    handleOnLogout={handleOnLogout}
                />

                <Burger handleOpenModal={handleOpenModal} />
            </div>

            <UniversalModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                title={formMode === "login" ? "Log In" : "Registration"}
                description={
                    formMode === "login"
                        ? "Welcome back! Please enter your credentials to access your account and continue your search for a teacher."
                        : "Thank you for your interest in our platform! Please provide the necessary information to register."
                }
                content={
                    <LoginAndRegisterForm
                        mode={formMode ?? "login"}
                        onRequestClose={handleCloseModal}
                    />
                }
            />
        </header>
    );
}
