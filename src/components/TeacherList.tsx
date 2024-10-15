"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchTeachersWithFilters } from "../services/filterService";
import { selectAllTeachers } from "../redux/teachersSlice";

import { FaUserSlash } from "react-icons/fa";

import TeacherItem from "./TeacherCard";

const TeacherList: React.FC = () => {
    const dispatch = useDispatch();
    const teachers = useSelector(selectAllTeachers);
    const filters = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        fetchTeachersWithFilters(filters, dispatch);
    }, [filters, dispatch]);

    return teachers.length > 0 ? (
        <ul className="flex flex-col gap-8">
            {teachers.map((teacher) => (
                <TeacherItem
                    teacher={teacher}
                    key={teacher.id}
                />
            ))}
        </ul>
    ) : (
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-sm bg-background text-center">
            <FaUserSlash className="text-textGray text-6xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No teachers available</h2>
            <p className="text-textGray">
                Sorry, we couldn't find any teachers at the moment. Please try again later or adjust your filters.
            </p>
        </div>
    );
};

export default TeacherList;
