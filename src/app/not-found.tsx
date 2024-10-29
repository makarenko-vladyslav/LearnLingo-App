import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
    return (
        <section className="h-[100vh] bg-background flex flex-col items-center justify-center gap-4 px-5 lg:px-0">
            <Image
                src="/404.png"
                width={150}
                height={220}
                alt="404 page"
                priority={true}
                className="w-auto h-auto"
            />

            <h1 className="text-5xl md:text-[56px] leading-[64px] text-text text-center">Page Not Found</h1>

            <p className="text-center leading-6 tracking-wider">
                The page you are looking for might have been removed, <br /> had its name changed or is temporarily
                unavailable.
            </p>

            <Link
                className="bg-buttonHover hover:bg-secondary text-text px-20 py-4 rounded-xl font-bold transition-colors duration-150"
                href={"/"}>
                Home Page
            </Link>
        </section>
    );
}
