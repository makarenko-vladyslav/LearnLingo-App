import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "../components/Header/Header";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Providers } from "../components/Providers";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "LearnLingo - Find Your Ideal Language Teacher",
    description:
        "LearnLingo connects you with expert language teachers to help you achieve your language learning goals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable} antialiased`}
                id="__next">
                <Providers>
                    <Header />
                    <main>{children}</main>
                </Providers>
            </body>
        </html>
    );
}
