"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLevelFilter } from "../../redux/slices/filtersSlice";
import { Teacher } from "../../redux/teachersTypes";
import { selectLevel } from "../../redux/selectors";

interface TeacherLevelsProps {
    teacher: Teacher;
}

const TeacherLevels: React.FC<TeacherLevelsProps> = ({ teacher }) => {
    const dispatch = useDispatch();
    const selectedLevel = useSelector(selectLevel);

    const setLevel = (level: string) => {
        dispatch(setLevelFilter(level));
    };

    return (
        <ul className="flex flex-wrap gap-2 md:gap-4">
            {teacher.levels.map((level, index) => (
                <li
                    key={index}
                    className={`py-2 px-3 border border-text20 rounded-full transition-all duration-300 text-nowrap hover:bg-buttonHover hover:shadow-md hover:border-transparent ${
                        (level === selectedLevel || (!selectedLevel && index === 0)) && "bg-primary border-transparent"
                    }`}>
                    <button onClick={() => setLevel(level)}>#{level}</button>
                </li>
            ))}
        </ul>
    );
};

export default TeacherLevels;
