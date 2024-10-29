import Link from "next/link";

export function HeroSection() {
    return (
        <div className="bg-backgroundSection rounded-[30px] relative p-8 py-16 sm:px-10 md:max-lg:px-20 md:max-lg:py-24 lg:px-8 lg:py-12 xl:px-16 2xl:pl-16 2xl:pr-[108px] 2xl:py-[98px]">
            <h1 className="text-[40px] leading-tight font-medium tracking-[-0.02em] md:text-5xl md:leading-[117%] mb-4 md:mb-6 lg:mb-8 lg:text-[42px] xl:text-5xl">
                Unlock your potential with the best{" "}
                <span className="relative z-[1] italic font-medium custom-accent">language</span> tutors
            </h1>
            <p className="leading-[137%] mb-10 lg:mb-16">
                Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to
                new heights by connecting with highly qualified and experienced tutors.
            </p>

            <div className="flex justify-center lg:block ">
                <Link
                    href={"/teachers"}
                    className="bg-primary w-fit font-medium px-20 py-4 rounded-xl hover:bg-buttonHover transition-all ">
                    Get started
                </Link>
            </div>
        </div>
    );
}
