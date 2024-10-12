import Image from "next/image";
import Link from "next/link";

import LoginAndRegisterForm from "../components/LoginAndRegisterForm";

export default function Header() {
    return (
        <header className="container flex justify-between py-5 px-16 mx-auto">
            <a
                href="/"
                className="flex justify-items-center items-center gap-2">
                <Image
                    src="/logo.svg"
                    alt="Girl with laptop"
                    width={28}
                    height={28}
                    className="rounded-[30px]"
                    priority={true}
                />

                <p className="font-bold text-xl leading-[120%] translate-y-[0.125rem]">LearnLingo</p>
            </a>

            <nav className="">
                <ul className="leading-[125%] flex">
                    <li className="p-[14px]">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-[14px]">
                        <Link href="/teachers">Teachers</Link>
                    </li>
                </ul>
            </nav>

            <div>
                <button>Log in</button>
                <button>Registration</button>
            </div>

            {/* <LoginAndRegisterForm mode="register" />
                    <LoginAndRegisterForm mode="login" /> */}
        </header>
    );
}
