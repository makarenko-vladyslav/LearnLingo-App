"use client";

import React, { useState } from "react";
import { Teacher } from "../redux/teachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLevel, setLevelFilter } from "../redux/filtersSlice";

import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

import Image from "next/image";
import FavoriteBtn from "./FavoriteBtn";
import UniversalModal from "./Modal/UniversalModal";
import TrialLessonForm from "./Forms/TrialLessonForm";

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const [isShown, setIsShown] = useState(false);
    const selectedLevel = useSelector(selectLevel);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();

    const setLevel = (level: string) => {
        dispatch(setLevelFilter(level));
    };

    return (
        <li className="flex flex-col lg:flex-row gap-4 xl:gap-12 p-6 rounded-3xl shadow-sm bg-background relative font-medium">
            {/* Teacher photo */}

            <div className="w-[100px] h-[100px] l:w-[120px] l:h-[120px] shrink-0 relative border-2 rounded-full border-secondary p-2 online">
                <Image
                    src={teacher.avatar_url}
                    alt={`${teacher.name} ${teacher.surname} photo`}
                    width={120}
                    height={120}
                    className="rounded-full block"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                />
            </div>

            {/* Stats info */}

            <div className="grow">
                <div className="flex flex-col lg:flex-row justify-between mb-8">
                    <div className="mb-6 lg:mb-0">
                        <p className="text-textGray mb-2 leading-normal">Name</p>

                        <h2 className="text-2xl leading-none ">
                            {teacher.name} {teacher.surname}
                        </h2>
                    </div>

                    <div className="flex justify-between lg:justify-center items-start">
                        <ul className="flex flex-col lg:flex-row gap-1 lg:gap-8  mr-12">
                            <li className="lg:verticalElement relative flex flex-row-reverse justify-end lg:justify-start lg:flex-row items-center gap-2">
                                <FiBookOpen />
                                <p>Lessons online</p>
                            </li>
                            <li className="lg:verticalElement relative">
                                <p>Lessons done: {teacher.lessons_done}</p>
                            </li>
                            <li className="relative flex flex-row-reverse justify-end lg:justify-start lg:flex-row items-center gap-2">
                                <FaStar className="text-primary" />
                                <p>Rating: {teacher.rating}</p>
                            </li>

                            <li className="lg:verticalElement relative">
                                <p>
                                    Price / 1 hour: <span className="text-green">{teacher.price_per_hour}$</span>
                                </p>
                            </li>
                        </ul>

                        <FavoriteBtn teacher={teacher} />
                    </div>
                </div>

                {/* Main info */}

                <ul className="mb-4 flex flex-col gap-2">
                    <li>
                        <p className="text-textGray">
                            Speaks:{" "}
                            {teacher.languages.map((language, index) => (
                                <span
                                    key={index}
                                    className="text-text  underline">
                                    {language}
                                    {index + 1 < teacher.languages.length ? ", " : ""}
                                </span>
                            ))}
                        </p>
                    </li>

                    <li>
                        <p className="text-textGray">
                            Lesson Info: <span className="text-text ">{teacher.lesson_info}</span>
                        </p>
                    </li>
                    <li>
                        <p className="text-textGray">
                            Conditions: <span className="text-text ">{teacher.conditions}</span>
                        </p>
                    </li>
                </ul>

                {/* Button and hidden info */}

                <button
                    className={`mb-8 underline leading-normal text-primary hover:text-buttonHover transition-colors duration-200 ${
                        isShown ? "hidden" : "visible"
                    }`}
                    onClick={() => setIsShown(true)}>
                    Read more
                </button>

                <div className={isShown ? "visible" : "hidden"}>
                    <p className="mb-8 font-normal">{teacher.experience}</p>

                    {teacher.reviews.length > 0 ? (
                        <ul className="flex flex-col gap-8 mb-8">
                            {teacher.reviews.map((review, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col">
                                    <div className="flex gap-3">
                                        <span className="w-12 h-12 rounded-full bg-secondary flex self-start justify-center items-center text-xl  text-text">
                                            {review.reviewer_name[0].toUpperCase()}
                                        </span>

                                        <div className="name_rating flex self-end">
                                            <div className="flex flex-col justify-center mb-4">
                                                <p className="mb-0.5 text-textGray  leading-normal">
                                                    {review.reviewer_name}
                                                </p>

                                                <span className="flex items-center gap-2 ">
                                                    <FaStar className="text-primary" />
                                                    {review.reviewer_rating.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="leading-normal ">{review.comment}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Teacher doesn&apos;t have any reviews.</p>
                    )}
                </div>

                {/* Levels */}

                <ul className="flex flex-wrap gap-2 md:gap-4">
                    {teacher.levels.map((level, index) => (
                        <li
                            key={index}
                            className={`py-2 px-3 border border-text20 rounded-full transition-all duration-300 text-nowrap hover:bg-buttonHover hover:shadow-md hover:border-transparent ${
                                (level === selectedLevel || (!selectedLevel && index === 0)) &&
                                "bg-primary border-transparent"
                            }`}>
                            <button onClick={() => setLevel(level)}>#{level}</button>
                        </li>
                    ))}
                </ul>

                {/* Booking button */}

                <div className="max-lg:flex justify-center">
                    <button
                        className={`text-lg rounded-xl bg-primary py-4 px-12 w-fit hover:bg-buttonHover transition-colors duration-200 mt-8 ${
                            isShown ? "visible" : "hidden"
                        }`}
                        onClick={() => setIsModalOpen(true)}
                        type="button">
                        Book trial lesson
                    </button>
                </div>

                <UniversalModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    title="Book trial lesson"
                    description="Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs."
                    content={
                        <TrialLessonForm
                            onRequestClose={() => setIsModalOpen(false)}
                            teacher={teacher}
                        />
                    }
                />
            </div>
        </li>
    );
};

export default TeacherCard;
