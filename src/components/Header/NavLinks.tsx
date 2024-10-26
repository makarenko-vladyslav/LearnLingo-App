import Link from "next/link";

interface NavLinksProps {
    burger?: boolean;
    onLinkClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ burger = false, onLinkClick }) => (
    <nav
        className={`${
            burger ? "flex flex-col justify-center items-center gap-6 mt-4" : "leading-[125%] lg:flex hidden"
        }`}>
        <ul className={`${burger ? "flex flex-col items-center" : "lg:flex flex-row gap-8"}`}>
            <li className={`p-[14px] ${burger ? "text-lg text-text p-[10px]" : ""}`}>
                <Link
                    href="/"
                    className="hover:text-buttonHover transition-colors duration-150"
                    onClick={onLinkClick}>
                    Home
                </Link>
            </li>
            <li className={`p-[14px] ${burger ? "text-lg text-text p-[10px]" : ""}`}>
                <Link
                    href="/teachers"
                    className="hover:text-buttonHover transition-colors duration-150"
                    onClick={onLinkClick}>
                    Teachers
                </Link>
            </li>
        </ul>
    </nav>
);

export default NavLinks;
