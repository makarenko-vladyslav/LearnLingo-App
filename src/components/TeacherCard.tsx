import React, { useState } from "react";
import { Teacher } from "../redux/teachersSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLevel, setLevelFilter } from "../redux/filtersSlice";

import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

import Image from "next/image";
import FavoriteBtn from "./FavoriteBtn";

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const [isShown, setIsShown] = useState(false);
    const selectedLevel = useSelector(selectLevel);

    const dispatch = useDispatch();

    const setLevel = (level: string) => {
        dispatch(setLevelFilter(level));
    };

    return (
        <div className="flex gap-12 p-6 rounded-3xl shadow-sm bg-background relative">
            {/* Teacher photo */}

            <div className="w-[120px] h-[120px] shrink-0 relative border-2 rounded-full border-secondary p-2 online">
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
                <div className="flex justify-between mb-8">
                    <div className="">
                        <p className="text-textGray mb-2 leading-normal">Languages</p>

                        <h2 className="text-2xl leading-none">
                            {teacher.name} {teacher.surname}
                        </h2>
                    </div>

                    <div className="flex justify-center items-start">
                        <ul className="flex gap-8 font-semibold mr-12">
                            <li className="verticalElement relative flex items-center gap-2">
                                <FiBookOpen />
                                <p>Lessons online</p>
                            </li>
                            <li className="verticalElement relative">
                                <p>Lessons done: {teacher.lessons_done}</p>
                            </li>
                            <li className="verticalElement relative flex items-center gap-2">
                                <FaStar className="text-primary" />
                                <p>Rating: {teacher.rating}</p>
                            </li>
                            <li className="verticalElement relative">
                                <p>
                                    Price / 1 hour: <span className="text-green">{teacher.price_per_hour}$</span>
                                </p>
                            </li>
                        </ul>

                        <FavoriteBtn teacherId={teacher.id} />
                    </div>
                </div>

                {/* Main info */}

                <ul className="mb-4">
                    <li>
                        <p className="text-textGray">
                            Speaks:{" "}
                            {teacher.languages.map((language, index) => (
                                <span
                                    key={index}
                                    className="text-text font-semibold underline">
                                    {language}
                                    {index + 1 < teacher.languages.length ? ", " : ""}
                                </span>
                            ))}
                        </p>
                    </li>

                    <li>
                        <p className="text-textGray">
                            Lesson Info: <span className="text-text font-semibold">{teacher.lesson_info}</span>
                        </p>
                    </li>
                    <li>
                        <p className="text-textGray">
                            Conditions: <span className="text-text font-semibold">{teacher.conditions}</span>
                        </p>
                    </li>
                </ul>

                {/* Button and hidden info */}

                <button
                    className={`mb-8 font-bold underline leading-normal hover:text-buttonHover transition-colors duration-200 ${
                        isShown ? "hidden" : "visible"
                    }`}
                    onClick={() => setIsShown(true)}>
                    Read more
                </button>

                <div className={isShown ? "visible" : "hidden"}>
                    <p className="mb-8">{teacher.experience}</p>

                    {teacher.reviews.length > 0 ? (
                        <ul className="flex flex-col gap-8 mb-8">
                            {teacher.reviews.map((review, index) => (
                                <li
                                    key={index}
                                    className="flex flex-col">
                                    <div className="flex gap-3">
                                        <span className="w-12 h-12 rounded-full bg-secondary flex self-start justify-center items-center text-xl font-bold text-text">
                                            {review.reviewer_name[0].toUpperCase()}
                                        </span>

                                        <div className="name_rating flex self-end">
                                            <div className="flex flex-col justify-center mb-4">
                                                <p className="mb-0.5 text-textGray leading-normal">
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

                <ul className="flex gap-4 mb-8">
                    {teacher.levels.map((level, index) => (
                        <li
                            key={index}
                            className={`font-semibold py-2 px-3 border border-text20 rounded-full transition-colors duration-300 ${
                                level === selectedLevel && "bg-primary border-transparent"
                            }`}>
                            <button onClick={() => setLevel(level)}>#{level}</button>
                        </li>
                    ))}
                </ul>

                {/* Booking button */}

                <button
                    className={`text-lg rounded-xl bg-primary font-bold py-4 px-12 hover:bg-buttonHover transition-colors duration-200 ${
                        isShown ? "visible" : "hidden"
                    } `}>
                    Book trial lesson
                </button>
            </div>
        </div>
    );
};

export default TeacherCard;
