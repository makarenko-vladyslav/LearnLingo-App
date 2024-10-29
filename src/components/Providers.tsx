"use client";

import { ThemeProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";
import React, { ReactNode } from "react";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import AuthStatusChecker from "../services/AuthStatusChecker";
import "react-toastify/dist/ReactToastify.css";

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system">
                <AuthStatusChecker />

                {children}

                <ToastContainer />

                <div
                    id="modal-overlay"
                    aria-hidden="false"
                    role="dialog"
                />
            </ThemeProvider>
        </ReduxProvider>
    );
}
