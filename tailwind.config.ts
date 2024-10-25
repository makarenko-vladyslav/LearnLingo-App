import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                '2xl': '1440px', 
            },
            colors: {
                background: "var(--background)",
                backgroundSection: "var(--backgroundSection)",

                primary: "var(--primary)",
                secondary: "var(--secondary)",

                text: "var(--text)",
                text80: "var(--text80)",
                text10: "var(--text10)",
                text20: "var(--text20)",

                green: "var(--green)",
                textGray: "var(--textGray)",

                buttonHover: "var(--buttonHover)",
            },
        },
    },

    plugins: [],
};

export default config;
