import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <section className="relative container px-4 xl:px-16 ">
            <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_500px] 2xl:grid-cols-[1fr_568px] md:justify-center gap-6 mb-6">
                <div className="bg-backgroundSection rounded-[30px] relative p-8 py-16 sm:px-10 md:max-lg:px-20 md:max-lg:py-24 lg:px-8 lg:py-12 xl:px-16 2xl:pl-16 2xl:pr-[108px] 2xl:py-[98px]">
                    <h1 className="text-[40px] leading-tight font-medium tracking-[-0.02em] md:text-5xl md:leading-[117%] mb-4 md:mb-6 lg:mb-8 lg:text-[42px] xl:text-5xl">
                        Unlock your potential with the best{" "}
                        <span className="relative z-[1] italic font-medium custom-accent">language</span> tutors
                    </h1>
                    <p className="leading-[137%] mb-10 lg:mb-16">
                        Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language
                        proficiency to new heights by connecting with highly qualified and experienced tutors.
                    </p>

                    <div className="flex justify-center lg:block ">
                        <Link
                            href={"/teachers"}
                            className="bg-primary w-fit font-medium px-20 py-4 rounded-xl hover:bg-buttonHover transition-all ">
                            Get started
                        </Link>
                    </div>
                </div>

                <Image
                    src="/hero.png"
                    alt="Girl with laptop"
                    width={1000}
                    height={900}
                    className="rounded-[30px] w-full"
                    priority={true}
                />
            </div>

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
                    <li className="flex gap-4 justify-center items-center ">
                        <p className="text-xl sm:text-3xl font-medium leading-[114%] ">32,000 +</p>{" "}
                        <p className="flex flex-col lg:text-sm leading-[129%] sm:text-xl ">
                            Experienced <br className="hidden" /> tutors
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center ">
                        <p className="text-xl sm:text-3xl font-medium leading-[114%]">300,000 +</p>{" "}
                        <p className="flex flex-col lg:text-sm leading-[129%] sm:text-xl">
                            5-star tutor <br className="hidden" /> reviews
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center ">
                        <p className="text-xl sm:text-3xl font-medium leading-[114%]">120 +</p>{" "}
                        <p className="flex flex-col lg:text-sm leading-[129%] sm:text-xl">
                            Subjects <br className="hidden" /> taught
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center ">
                        <p className="text-xl sm:text-3xl font-medium leading-[114%]">200 +</p>{" "}
                        <p className="flex flex-col lg:text-sm leading-[129%] sm:text-xl">
                            Tutor <br className="hidden" /> nationalities
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
