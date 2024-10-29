import React from "react";

interface TrialLessonButtonProps {
    isShown: boolean;
    onClick: () => void;
}

const TrialLessonButton: React.FC<TrialLessonButtonProps> = ({ isShown, onClick }) => (
    <div className="max-lg:flex justify-center">
        <button
            className={`text-lg rounded-xl bg-primary py-4 px-12 w-fit hover:bg-buttonHover transition-colors duration-200 mt-8 ${
                isShown ? "visible" : "hidden"
            }`}
            onClick={onClick}
            type="button">
            Book trial lesson
        </button>
    </div>
);

export default TrialLessonButton;
