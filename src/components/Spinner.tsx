"use client";

import React, { useEffect } from "react";
import { dotPulse } from "ldrs";

interface SpinnerProps {
    color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "#fff" }) => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            dotPulse.register();
        }
    }, []);

    return (
        <l-dot-pulse
            size="43"
            speed="1.3"
            color={color}></l-dot-pulse>
    );
};

export default Spinner;
