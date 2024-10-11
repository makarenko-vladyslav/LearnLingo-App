import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                backgroundSection: "var(--backgroundSection)",

                primary: "var(--primary)",
                secondary: "var(--secondary)",
                text: "var(--text)",

                green: "var(--green)",
                gray: "var(--gray)",

                buttonHover: "var(--buttonHover)",
            },
        },
    },
    plugins: [],
};
export default config;
