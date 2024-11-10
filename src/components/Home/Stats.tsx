import { StatItem } from "./StatItem";

export function Stats() {
    return (
        <div className="relative">
            <svg
                className="borderSvg"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                    className="borderRect"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    rx="32"
                    ry="32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                />
            </svg>
            <ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 justify-center py-6 md:py-10 w-full text-nowrap cursor-default">
                <StatItem
                    value="32,000 +"
                    description="Experienced tutors"
                />
                <StatItem
                    value="300,000 +"
                    description="5-star tutor reviews"
                />
                <StatItem
                    value="120 +"
                    description="Subjects taught"
                />
                <StatItem
                    value="200 +"
                    description="Tutor nationalities"
                />
            </ul>
        </div>
    );
}
