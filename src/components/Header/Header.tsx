"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectAuthLoading } from "../../redux/authSlice";
import { handleLogout } from "../../services/authService";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import AuthModal from "../Modal/AuthModal";

import Burger from "./Burger";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"login" | "register" | null>(null);
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
        <header>
            <div className="container flex justify-between items-center px-6 py-5 xl:px-32">
                <Logo />

                <NavLinks />

                <AuthButtons
                    isAuthenticated={isAuthenticated}
                    handleOpenModal={handleOpenModal}
                    handleOnLogout={handleOnLogout}
                />

                <Burger
                    isAuthenticated={isAuthenticated}
                    handleOpenModal={handleOpenModal}
                    handleOnLogout={handleOnLogout}
                />

                <AuthModal
                    isModalOpen={isModalOpen}
                    formMode={formMode}
                    handleCloseModal={handleCloseModal}
                />
            </div>
        </header>
    );
}
