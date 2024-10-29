import React from "react";
import Spinner from "./Spinner";

interface LoadMoreButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, isLoading }) => {
    return (
        <div className="flex justify-center items-center">
            <button
                onClick={onClick}
                className="px-12 py-4 mt-8 min-w-48 bg-primary text-text font-bold rounded-xl leading-[156%] hover:bg-buttonHover transition-all duration-200">
                {isLoading ? <Spinner /> : "Load more"}
            </button>
        </div>
    );
};

export default LoadMoreButton;
