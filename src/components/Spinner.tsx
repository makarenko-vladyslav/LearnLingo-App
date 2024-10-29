"use client";

import React, { useEffect } from "react";
import { dotPulse } from "ldrs";

interface SpinnerProps {
    color?: string;
    fullHeight?: boolean | undefined;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "#fff", fullHeight }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            dotPulse.register();
        }
    }, []);

    return fullHeight ? (
        <div className="min-h-[75vh] flex justify-center items-center">
            <l-dot-pulse
                size="43"
                speed="1.3"
                color={color}></l-dot-pulse>
        </div>
    ) : (
        <l-dot-pulse
            size="43"
            speed="1.3"
            color={color}></l-dot-pulse>
    );
};

export default Spinner;
