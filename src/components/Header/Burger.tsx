"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../redux/authSlice";
import { handleLogout } from "../../services/authService";
import UniversalModal from "../UniversalModal";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";

interface BurgerProps {
    handleOpenModal: (mode: "login" | "register") => void;
}

const Burger: React.FC<BurgerProps> = ({ handleOpenModal }) => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const handleToggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const handleLogoutClick = () => {
        handleLogout(dispatch, router);
        setIsBurgerOpen(false);
    };

    return (
        <div className="md:hidden flex justify-center items-center p-2">
            <button
                className="burger z-10"
                onClick={handleToggleBurger}>
                <span
                    className={`burger-line focus:outline-none bg-textGray ${
                        isBurgerOpen
                            ? "bg-transparent after:-rotate-45 after:translate-y-0 before:rotate-45 before:translate-y-0"
                            : "bg-textGray"
                    }`}
                />
            </button>

            <UniversalModal
                isOpen={isBurgerOpen}
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
                            handleOnLogout={handleLogoutClick}
                            burger={true}
                        />
                    </div>
                }
            />
        </div>
    );
};

export default Burger;
