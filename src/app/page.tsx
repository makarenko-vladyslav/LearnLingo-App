import Image from "next/image";

export default function Page() {
    return (
        <section className="relative">
            <div className="grid grid-cols-[1fr_530px] gap-6 mb-6">
                <div className="bg-backgroundSection rounded-[30px] relative flex flex-col justify-center items-content pl-16 pr-[6.75rem w-full">
                    <h1 className="w-[580px] text-5xl leading-[117%] font-bold mb-8">
                        Unlock your potential with the best{" "}
                        <span className="relative z-[1] italic font-medium custom-accent">language</span> tutors
                    </h1>
                    <p className="text-[16px] leading-[137%] mb-16 w-[470px]">
                        Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language
                        proficiency to new heights by connecting with highly qualified and experienced tutors.
                    </p>
                    <div>
                        <button className="bg-primary font-bold px-20 py-4 rounded-xl hover:bg-buttonHover transition-all">
                            Get started
                        </button>
                    </div>
                </div>

                <div className="relative  flex-1 overflow-hidden">
                    <Image
                        src="/hero.png"
                        alt="Girl with laptop"
                        width={568}
                        height={530}
                        className="rounded-[30px]"
                        priority={true}
                    />
                </div>
            </div>

            <div className="relative">
                <svg
                    className="custom-border"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                        className="custom-border-rect"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="30"
                        ry="30"
                    />
                </svg>

                <ul className="relative flex gap-[100px] justify-center py-10 w-full text-nowrap cursor-default">
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-bold leading-[114%] ">32,000 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%] ">
                            <span>Experienced</span> tutors
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-bold leading-[114%]">300,000 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%]">
                            <span>5-star tutor </span> reviews
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-bold leading-[114%]">120 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%]">
                            <span>Subjects </span> taught
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-bold leading-[114%]">200 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%]">
                            <span>Tutor </span> nationalities
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
