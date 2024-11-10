import Image from "next/image";

export function HeroImage() {
    return (
        <Image
            src="/hero.png"
            alt="Girl with laptop"
            width={1000}
            height={900}
            className="rounded-[30px] w-full"
            priority={true}
        />
    );
}
