"use client";

import React, { useState } from "react";
import { Teacher } from "../../redux/teachersSlice";
import FavoriteBtn from "../FavoriteBtn";
import UniversalModal from "../UniversalModal";
import TrialLessonForm from "../Forms/TrialLessonForm";
import TeacherPhoto from "./TeacherPhoto";
import TeacherStats from "./TeacherStats";
import TeacherInfo from "./TeacherInfo";
import TeacherReviews from "./TeacherReviews";
import TeacherLevels from "./TeacherLevels";
import TrialLessonButton from "./TrialLessonButton";

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
    const [isShown, setIsShown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <li className="flex flex-col lg:flex-row gap-4 xl:gap-12 p-6 rounded-3xl shadow-sm bg-background relative font-medium">
            <TeacherPhoto
                avatar_url={teacher.avatar_url}
                name={teacher.name}
                surname={teacher.surname}
            />

            <div className="grow">
                <div className="flex flex-col lg:flex-row justify-between mb-8">
                    <TeacherStats teacher={teacher} />
                    <FavoriteBtn teacher={teacher} />
                </div>

                <TeacherInfo teacher={teacher} />

                <button
                    className={`mb-8 underline leading-normal text-primary hover:text-buttonHover transition-colors duration-200 ${
                        isShown ? "hidden" : "visible"
                    }`}
                    onClick={() => setIsShown(true)}>
                    Read more
                </button>

                <div className={isShown ? "visible" : "hidden"}>
                    <p className="mb-8 font-normal">{teacher.experience}</p>
                    <TeacherReviews reviews={teacher.reviews} />
                </div>

                <TeacherLevels teacher={teacher} />

                <TrialLessonButton
                    isShown={isShown}
                    onClick={() => setIsModalOpen(true)}
                />

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
