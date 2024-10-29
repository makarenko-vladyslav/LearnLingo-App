"use client";

import { useEffect } from "react";
import Modal from "react-modal";

interface UniversalModalProps {
    isOpen: boolean;
    isBurger?: boolean;
    onRequestClose: () => void;
    content?: React.ReactNode;
    title?: string;
    description?: string;
}

export default function UniversalModal({
    isOpen,
    isBurger = false,
    onRequestClose,
    content,
    title,
    description,
}: UniversalModalProps) {
    useEffect(() => {
        if (typeof document !== "undefined") {
            Modal.setAppElement("#modal-overlay");
        }

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else if (!isBurger) {
            document.body.style.overflow = "";
        }

        return () => {
            if (!isBurger) {
                document.body.style.overflow = "";
            }
        };
    }, [isOpen, isBurger]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4"
            className={`bg-background py-16 px-6 sm:p-16 rounded-lg shadow-xl relative w-full max-h-[95dvh] overflow-y-auto ${
                isBurger ? "max-w-96" : "max-w-[566px]"
            }`}>
            {title && <h1 className="font-medium text-[2.5rem] mb-5">{title}</h1>}
            {description && <p className="leading-[137%] mb-10 text-text80">{description}</p>}
            {content}
            <button
                className="absolute top-3 right-5 text-3xl"
                onClick={onRequestClose}>
                &times;
            </button>
        </Modal>
    );
}
