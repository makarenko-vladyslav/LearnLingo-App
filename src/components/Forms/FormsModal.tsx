import { useEffect } from "react";
import Modal from "react-modal";
import { Teacher } from "../../redux/teachersSlice";

interface FormsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    content: React.ReactNode;
    title: string;
    description?: string;
    teacher?: Teacher;
}

export default function FormsModal({ isOpen, onRequestClose, content, title, description }: FormsModalProps) {
    useEffect(() => {
        Modal.setAppElement("#__next");

        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            shouldCloseOnOverlayClick={true}
            ariaHideApp={false}
            contentLabel={title}
            overlayClassName="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            className="bg-white p-16 rounded-lg shadow-lg relative max-w-[556px] mx-auto">
            <h1 className="font-medium text-[2.5rem] mb-5 leading-[120%] tracking-[-0.02em]">{title}</h1>

            {description && <p className="leading-[137%] mb-5 text-text80">{description}</p>}

            <button
                className="absolute top-3 right-5 text-3xl"
                onClick={onRequestClose}>
                &times;
            </button>

            {content}
        </Modal>
    );
}
