"use client";

import React, { useState } from "react";
import Modal from "react-modal";

import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import FavoriteBtn from "../FavoriteBtn";

interface BurgerProps {
    isAuthenticated: boolean;
    handleOpenModal: (mode: "login" | "register") => void;
    handleOnLogout: () => void;
}

const Burger: React.FC<BurgerProps> = ({ isAuthenticated, handleOpenModal, handleOnLogout }) => {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    const toggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    };

    const closeBurger = () => {
        setIsBurgerOpen(false);
    };

    return (
        <>
            <div className="flex justify-center items-center gap-6 lg:hidden">
                <FavoriteBtn />
                <button
                    className="burger z-10 "
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

            <Modal
                isOpen={isBurgerOpen}
                onRequestClose={toggleBurger}
                contentLabel="Navigation Menu"
                overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-500 ease-in-out"
                className={`bg-backgroundSection px-6 py-10 rounded-lg w-80 max-w-full outline-none shadow-lg text-text transition-transform transform ${
                    isBurgerOpen ? "translate-y-0" : "-translate-y-full"
                }`}>
                <button
                    className="absolute top-3 right-4 text-3xl text-text"
                    onClick={closeBurger}>
                    &times;
                </button>

                <div className="flex flex-col gap-2">
                    <NavLinks
                        burger={true}
                        onLinkClick={closeBurger}
                    />
                    <AuthButtons
                        isAuthenticated={isAuthenticated}
                        handleOpenModal={handleOpenModal}
                        handleOnLogout={handleOnLogout}
                        burger={true}
                    />
                </div>
            </Modal>
        </>
    );
};

export default Burger;
