import Image from "next/image";

export default function Page() {
    return (
        <section className="relative container px-16">
            <div className="grid grid-cols-[1fr_568px] gap-6 mb-6 ">
                <div className="bg-backgroundSection rounded-[30px] relative pl-16 pr-[108px] py-[98px]">
                    <h1 className="text-5xl font-medium leading-[117%] tracking-[-0.02em] mb-8">
                        Unlock your potential with the best{" "}
                        <span className="relative z-[1] italic font-medium custom-accent">language</span> tutors
                    </h1>
                    <p className="text-[16px] leading-[137%] mb-16 w-[470px]">
                        Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language
                        proficiency to new heights by connecting with highly qualified and experienced tutors.
                    </p>
                    <div>
                        <button className="bg-primary font-medium px-20 py-4 rounded-xl hover:bg-buttonHover transition-all">
                            Get started
                        </button>
                    </div>
                </div>

                <Image
                    src="/hero.png"
                    alt="Girl with laptop"
                    width={568}
                    height={530}
                    className="rounded-[30px]"
                    priority={true}
                />
            </div>

            <div className="relative custom-border">
                <ul className="relative flex gap-[100px] justify-center py-10 w-full text-nowrap cursor-default">
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-medium leading-[114%] ">32,000 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%] ">
                            <span>Experienced</span> tutors
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-medium leading-[114%]">300,000 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%]">
                            <span>5-star tutor </span> reviews
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-medium leading-[114%]">120 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%]">
                            <span>Subjects </span> taught
                        </p>
                    </li>
                    <li className="flex gap-4 justify-center items-center">
                        <p className="text-3xl font-medium leading-[114%]">200 +</p>{" "}
                        <p className="flex flex-col text-sm leading-[129%]">
                            <span>Tutor </span> nationalities
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
