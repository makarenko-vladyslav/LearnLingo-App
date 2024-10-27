"use client";

import React from "react";
import UniversalModal from "../Modal/UniversalModal";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import FavoriteBtn from "../FavoriteBtn";

interface BurgerProps {
    isAuthenticated: boolean;
    isBurgerOpen: boolean;
    handleOpenModal: (mode: "login" | "register") => void;
    handleOnLogout: () => void;
    closeBurger: () => void;
    toggleBurger: () => void;
}

const Burger: React.FC<BurgerProps> = ({
    isAuthenticated,
    isBurgerOpen,
    handleOpenModal,
    handleOnLogout,
    closeBurger,
    toggleBurger,
}) => {
    return (
        <>
            <div className="flex justify-center items-center gap-8 lg:hidden">
                <FavoriteBtn />

                <button
                    className="burger z-10"
                    type="button"
                    onClick={toggleBurger}>
                    <span
                        className={`burger-line focus:outline-none bg-textGray ${
                            isBurgerOpen
                                ? "bg-transparent after:-rotate-45 after:translate-y-0 before:rotate-45 before:translate-y-0"
                                : "bg-textGray"
                        }`}
                    />
                </button>
            </div>

            <UniversalModal
                isOpen={isBurgerOpen}
                onRequestClose={closeBurger}
                isBurger={true}
                content={
                    <div className="flex flex-col gap-10">
                        <NavLinks
                            burger={true}
                            onLinkClick={closeBurger}
                        />
                        <AuthButtons
                            isAuthenticated={isAuthenticated}
                            handleOpenModal={(mode) => {
                                handleOpenModal(mode);
                                closeBurger();
                            }}
                            handleOnLogout={handleOnLogout}
                            burger={true}
                        />
                    </div>
                }
            />
        </>
    );
};

export default Burger;
