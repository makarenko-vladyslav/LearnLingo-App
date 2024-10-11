import Image from "next/image";

export default function Home() {
    return (
        <section className="relative">
            <div className="container grid grid-cols-2 gap-6 mb-6">
                <div className="bg-backgroundSection rounded-[30px] relative flex flex-col justify-center items-content pl-16 pr-[6.75rem] flex-1">
                    <h1 className="w-[580px] text-5xl leading-[117%] tracking-[-0.02em] font-bold mb-8">
                        Unlock your potential with the best{" "}
                        <span className="relative z-[1] italic font-medium custom-accent">language</span> tutors
                    </h1>
                    <p className="text-[16px] leading-[137%] tracking-[-0.02em] mb-16 w-[470px]">
                        Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language
                        proficiency to new heights by connecting with highly qualified and experienced tutors.
                    </p>
                    <div>
                        <button className="bg-primary font-bold px-20 py-4 rounded-xl hover:bg-buttonHover transition-all">
                            Get started
                        </button>
                    </div>
                </div>

                <div className="relative h-full w-fit flex-1 overflow-hidden">
                    <Image
                        src="/hero.png"
                        alt="Girl with laptop"
                        width={720}
                        height={600}
                        className="rounded-[30px]"
                        priority={true}
                    />
                </div>
            </div>

            <ul className="custom-border relative flex gap-[100px] justify-center tracking-[-0.02em] py-10">
                <li className="flex gap-4 justify-center items-center">
                    <p className="text-3xl font-bold leading-[114%]">32,000 +</p>{" "}
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
        </section>
    );
}
