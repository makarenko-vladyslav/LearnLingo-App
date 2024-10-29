"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectAuthLoading } from "../../redux/authSlice";
import { handleLogout } from "../../services/authService";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import UniversalModal from "../Modal/UniversalModal";
import FavoriteBtn from "../FavoriteBtn";
import LoginAndRegisterForm from "../Forms/LoginAndRegisterForm";
import { ThemeSwitcher } from "../ThemeSwitcher";

export default function Header() {
    const [formMode, setFormMode] = useState<"login" | "register" | null>(null);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);

    const handleOpenModal = (mode: "login" | "register") => {
        setFormMode(mode);
        setIsModalOpen(true);
        setIsBurgerOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormMode(null);
    };

    const handleOnLogout = () => {
        handleLogout(dispatch, router);
        setIsBurgerOpen(false);
    };

    if (loading) return null;

    return (
        <header>
            <div className="container flex justify-between items-center px-6 py-5 xl:px-32">
                <Logo />

                <NavLinks />

                <AuthButtons
                    isAuthenticated={isAuthenticated}
                    handleOpenModal={handleOpenModal}
                    handleOnLogout={handleOnLogout}
                />

                <div className="md:hidden flex items-center gap-6">
                    <div className="flex justify-center items-center gap-3">
                        <ThemeSwitcher />

                        {isAuthenticated && <FavoriteBtn />}
                    </div>

                    <button
                        className="burger z-10"
                        onClick={() => setIsBurgerOpen(!isBurgerOpen)}>
                        <span
                            className={`burger-line focus:outline-none bg-textGray ${
                                isBurgerOpen
                                    ? "bg-transparent after:-rotate-45 after:translate-y-0 before:rotate-45 before:translate-y-0"
                                    : "bg-textGray"
                            }`}
                        />
                    </button>
                </div>

                {/* Modal for login/register */}
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

                {/* Modal for Burger menu */}
                <UniversalModal
                    isOpen={isBurgerOpen && !isModalOpen}
                    onRequestClose={() => setIsBurgerOpen(false)}
                    content={
                        <div className="flex flex-col gap-10">
                            <NavLinks
                                burger={true}
                                onLinkClick={() => setIsBurgerOpen(false)}
                            />
                            <AuthButtons
                                isAuthenticated={isAuthenticated}
                                handleOpenModal={(mode) => {
                                    handleOpenModal(mode);
                                    setIsBurgerOpen(false);
                                }}
                                handleOnLogout={handleOnLogout}
                                burger={true}
                            />
                        </div>
                    }
                />
            </div>
        </header>
    );
}
