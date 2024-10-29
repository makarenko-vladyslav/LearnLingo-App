import React from "react";
import { FaUserSlash } from "react-icons/fa";

const NoTeachersMessage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-sm bg-background text-center">
            <FaUserSlash className="text-textGray text-6xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No teachers available</h2>
            <p className="text-textGray">
                Sorry, we couldn&apos;t find any teachers at the moment. Please try again later or adjust your filters.
            </p>
        </div>
    );
};

export default NoTeachersMessage;
