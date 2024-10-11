import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const roboto = localFont({
    src: [
        {
            path: "./fonts/Roboto-Regular.woff",
            style: "normal",
            weight: "400",
        },
        {
            path: "./fonts/Roboto-Medium.woff",
            style: "normal",
            weight: "500",
        },
        {
            path: "./fonts/Roboto-Bold.woff",
            style: "normal",
            weight: "700",
        },
        {
            path: "./fonts/Roboto-Italic.woff",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
                <body className={`${roboto.variable} antialiased`}>{children}</body>
        </html>
    );
}
