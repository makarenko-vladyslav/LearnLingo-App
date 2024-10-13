import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import LoginModal from "./auth/LoginModal";

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"login" | "register" | null>(null);

    const handleOpenModal = (mode: "login" | "register"): void => {
        setFormMode(mode);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormMode(null);
    };

    return (
        <header className="flex py-5 px-32 mx-auto max-w-[1440px]">
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

                <p className="font-bold text-xl leading-[120%] cursor-pointer">LearnLingo</p>
            </a>

            <nav className="ml-auto mr-[16.5rem]">
                <ul className="leading-[125%] flex">
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

            <div className="flex ">
                <button
                    className="flex justify-center items-center gap-2 px-2 pr-4 py-3 font-bold hover:text-buttonHover transition-colors duration-200 "
                    onClick={() => handleOpenModal("login")}>
                    <FiLogIn className="text-primary text-xl" />
                    Log in
                </button>
                <button
                    className="bg-text text-background font-bold px-10 py-3.5 rounded-xl hover:text-text hover:bg-buttonHover transition-all duration-200 shadow-lg"
                    onClick={() => handleOpenModal("register")}>
                    Registration
                </button>
            </div>

            <LoginModal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                formMode={formMode}
            />
        </header>
    );
}
