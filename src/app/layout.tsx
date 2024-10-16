import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "../components/Header";
import "./globals.css";
import ClientProviders from "../components/ClientProviders";
import AuthStatusChecker from "../components/auth/AuthStatusChecker";

const roboto = localFont({
    src: [
        {
            path: "./fonts/Roboto-Regular.woff2",
            style: "normal",
            weight: "400",
        },
        {
            path: "./fonts/Roboto-Medium.woff2",
            style: "normal",
            weight: "500",
        },
        {
            path: "./fonts/Roboto-Bold.woff2",
            style: "normal",
            weight: "700",
        },
        {
            path: "./fonts/Roboto-Italic.woff2",
            style: "italic",
            weight: "400",
        },
    ],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "LearnLingo - Find Your Ideal Language Teacher",
    description:
        "LearnLingo connects you with expert language teachers to help you achieve your language learning goals. Browse profiles, read reviews, and start learning today!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${roboto.variable} antialiased`}
                id="__next">
                <ClientProviders>
                    <AuthStatusChecker />
                    <Header />
                    <main>{children}</main>
                </ClientProviders>
            </body>
        </html>
    );
}
