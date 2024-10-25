"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteTeachers } from "../redux/teachersSlice";
import { selectIsAuthenticated, selectAuthLoading } from "../redux/authSlice";
import { handleLogout } from "../services/authService";

import { FiLogIn } from "react-icons/fi";
import FavoriteBtn from "./FavoriteBtn";
import UniversalModal from "./Forms/FormsModal";
import LoginAndRegisterForm from "./Forms/LoginAndRegisterForm";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [formMode, setFormMode] = useState<"login" | "register" | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);

    const handleOpenModal = (mode: "login" | "register"): void => {
        setFormMode(mode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormMode(null);
    };

    const handleOnLogout = () => {
        handleLogout(dispatch, router);
        setFavoriteTeachers([]);
    };

    if (loading) {
        return null;
    }

    return (
        <header>
            <div className="container flex justify-between px-4 py-5 lg:px-32">
                <a
                    href="/"
                    className="flex justify-items-center items-center gap-2 ">
                    <Image
                        src="/logo.svg"
                        alt="Girl with laptop"
                        width={28}
                        height={28}
                        className="rounded-[30px]"
                        priority={true}
                    />

                    <p className="font-medium text-xl leading-[120%] cursor-pointer">LearnLingo</p>
                </a>

                <nav>
                    <ul className="leading-[125%] lg:flex hidden">
                        <li className="p-[14px]">
                            <Link
                                href="/"
                                className="hover:text-buttonHover transition-colors duration-150">
                                Home
                            </Link>
                        </li>
                        <li className="p-[14px]">
                            <Link
                                href="/teachers"
                                className="hover:text-buttonHover transition-colors duration-150">
                                Teachers
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="lg:flex hidden">
                    {isAuthenticated ? (
                        <>
                            <FavoriteBtn />

                            <button
                                className="ml-4 bg-text text-background font-medium px-10 py-3.5 rounded-xl hover:text-text hover:bg-buttonHover transition-all duration-200 shadow-lg"
                                onClick={handleOnLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="flex justify-center items-center gap-2 px-2 pr-4 py-3 font-medium hover:text-buttonHover transition-colors duration-200 "
                                onClick={() => handleOpenModal("login")}
                                type="button">
                                <FiLogIn className="text-primary text-xl" />
                                Log in
                            </button>
                            <button
                                className="bg-text text-background font-medium px-10 py-3.5 rounded-xl hover:text-text hover:bg-buttonHover transition-all duration-200 shadow-lg"
                                onClick={() => handleOpenModal("register")}
                                type="button">
                                Registration
                            </button>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-textGray rounded-lg lg:hidden hover:bg-primary hover:text-background focus:outline-none transition-colors duration-150">
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14">
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 1h15M1 7h15M1 13h15"
                        />
                    </svg>
                </button>

                {formMode === "login" ? (
                    <UniversalModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        title="Log In"
                        description="Welcome back! Please enter your credentials to access your account and continue your search for
                        a teacher."
                        content={
                            <LoginAndRegisterForm
                                onRequestClose={handleCloseModal}
                                mode={formMode ?? "login"}
                            />
                        }
                    />
                ) : (
                    <UniversalModal
                        isOpen={isModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        title="Registration"
                        description="Thank you for your interest in our platform! In order to register, we need some information.
                        Please provide us with the following information."
                        content={
                            <LoginAndRegisterForm
                                onRequestClose={handleCloseModal}
                                mode={formMode ?? "login"}
                            />
                        }
                    />
                )}
            </div>
        </header>
    );
}
