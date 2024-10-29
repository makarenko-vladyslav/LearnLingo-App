import React from "react";
import { FiBookOpen } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { Teacher } from "../../redux/teachersSlice";

interface TeacherStatsProps {
    teacher: Teacher;
}

const TeacherStats: React.FC<TeacherStatsProps> = ({ teacher }) => (
    <div className="flex justify-between lg:justify-center items-start">
        <ul className="flex flex-col lg:flex-row gap-1 lg:gap-8 mr-12">
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
    </div>
);

export default TeacherStats;
