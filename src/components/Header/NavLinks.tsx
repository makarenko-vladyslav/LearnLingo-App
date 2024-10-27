"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinksProps {
    burger?: boolean;
    onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ burger = false, onLinkClick }) => {
    const currentPath = usePathname();

    return (
        <nav
            className={`${
                burger ? "flex flex-col justify-center items-center gap-6" : "leading-[125%] md:flex hidden"
            }`}>
            <ul className={`${burger ? "flex flex-col items-center " : "md:flex flex-row lg:gap-8"}`}>
                <li className={`${burger ? "text-lg font-medium p-[6px] " : "p-[14px]"}`}>
                    <Link
                        href="/"
                        className={`${
                            currentPath === "/" ? "text-primary" : "text-text"
                        } hover:text-buttonHover transition-colors duration-150`}
                        onClick={onLinkClick}>
                        Home
                    </Link>
                </li>
                <li className={`${burger ? "text-lg font-medium p-[6px]" : "p-[14px]"}`}>
                    <Link
                        href="/teachers"
                        className={`${
                            currentPath === "/teachers" ? "text-primary" : "text-text"
                        } hover:text-buttonHover transition-colors duration-150`}
                        onClick={onLinkClick}>
                        Teachers
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;
