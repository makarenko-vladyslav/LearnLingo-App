import React from "react";
import { Teacher } from "../../redux/teachersTypes";

interface TeacherInfoProps {
    teacher: Teacher;
}

const TeacherInfo: React.FC<TeacherInfoProps> = ({ teacher }) => (
    <ul className="mb-4 flex flex-col gap-2">
        <li>
            <p className="text-textGray">
                Speaks:{" "}
                {teacher.languages.map((language, index) => (
                    <span
                        key={index}
                        className="text-text underline">
                        {language}
                        {index + 1 < teacher.languages.length ? ", " : ""}
                    </span>
                ))}
            </p>
        </li>
        <li>
            <p className="text-textGray">
                Lesson Info: <span className="text-text">{teacher.lesson_info}</span>
            </p>
        </li>
        <li>
            <p className="text-textGray">
                Conditions: <span className="text-text">{teacher.conditions}</span>
            </p>
        </li>
    </ul>
);

export default TeacherInfo;
