interface StatItemProps {
    value: string;
    description: string;
}

export function StatItem({ value, description }: StatItemProps) {
    return (
        <li className="flex gap-4 justify-center items-center hover:text-secondary transition-colors duration-150">
            <p className="text-xl sm:text-3xl font-medium leading-[114%]">{value}</p>
            <p className="flex flex-col lg:text-sm leading-[129%] sm:text-xl">{description}</p>
        </li>
    );
}
