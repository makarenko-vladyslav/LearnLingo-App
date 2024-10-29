import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="flex items-center gap-2">
            <Image
                src="/logo.svg"
                alt="Girl with laptop"
                width={28}
                height={28}
                className="rounded-[30px]"
                priority
            />

            <span className="font-medium text-xl leading-[120%] cursor-pointer hover:text-primary">LearnLingo</span>
        </Link>
    );
}
