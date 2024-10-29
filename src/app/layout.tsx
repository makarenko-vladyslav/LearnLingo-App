import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header/Header";
import ClientProviders from "../components/ClientProvider";
import AuthStatusChecker from "../services/AuthStatusChecker";
import { ThemeProvider } from "next-themes";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

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
                <ClientProviders>
                    <ThemeProvider attribute="class">
                        <AuthStatusChecker />
                        <Header />
                        <main>{children}</main>
                        <ToastContainer />
                        <div
                            id="modal-overlay"
                            aria-hidden="false"
                            role="dialog"
                        />
                    </ThemeProvider>
                </ClientProviders>
            </body>
        </html>
    );
}
