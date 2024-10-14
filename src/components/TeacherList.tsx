"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchTeachersWithFilters } from "../services/filterService";
import { selectAllTeachers } from "../redux/teachersSlice";

const TeacherList: React.FC = () => {
    const dispatch = useDispatch();
    const teachers = useSelector(selectAllTeachers);
    const filters = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        fetchTeachersWithFilters(filters, dispatch);
    }, [filters, dispatch]);

    return teachers.length > 0 ? (
        <ul>
            {teachers.map((teacher, index) => (
                <li key={index}>
                    <h3>
                        {teacher.name} {teacher.surname}
                    </h3>
                    <p>Languages: {teacher.languages.join(", ")}</p>
                    <p>Price per hour: ${teacher.price_per_hour}</p>
                    <p>Rating: {teacher.rating}</p>
                </li>
            ))}
        </ul>
    ) : (
        <p>No teachers available.</p>
    );
};

export default TeacherList;
