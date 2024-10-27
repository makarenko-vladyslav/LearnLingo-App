"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchTeachersWithFilters } from "../services/filterService";
import { Teacher } from "../redux/teachersSlice";
import { FaUserSlash } from "react-icons/fa";
import TeacherCard from "./TeacherCard";
import Spinner from "./Spinner";

interface TeacherListProps {
    teachers: Teacher[];
}

const ITEMS_PER_LOAD = 4;

const TeacherList: React.FC<TeacherListProps> = ({ teachers }) => {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    const [visibleTeachers, setVisibleTeachers] = useState(ITEMS_PER_LOAD);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeachers = async () => {
            setLoading(true);
            await fetchTeachersWithFilters(filters, dispatch);
            setLoading(false);
        };

        loadTeachers();
    }, [filters, dispatch]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleTeachers((prevVisible) => prevVisible + ITEMS_PER_LOAD);
            setIsLoadingMore(false);
        }, 1000);
    };

    if (loading) {
        return (
            <div className="min-h-dvh flex justify-center items-center">
                <Spinner color="#f4c550" />
            </div>
        );
    }

    if (teachers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-sm bg-background text-center">
                <FaUserSlash className="text-textGray text-6xl mb-4" />
                <h2 className="text-xl font-semibold text-gray-600 mb-2">No teachers available</h2>
                <p className="text-textGray">
                    Sorry, we couldn&apos;t find any teachers at the moment. Please try again later or adjust your
                    filters.
                </p>
            </div>
        );
    }

    return (
        <div>
            <ul className="flex flex-col gap-3 lg:gap-8">
                {teachers.slice(0, visibleTeachers).map((teacher) => (
                    <TeacherCard
                        teacher={teacher}
                        key={teacher.id}
                    />
                ))}
            </ul>

            {/* Кнопка "Load More" */}
            {visibleTeachers < teachers.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-12 py-4 min-w-48 bg-primary text-text font-bold rounded-xl leading-[156%] hover:bg-buttonHover transition-all duration-200"
                        disabled={isLoadingMore}>
                        {isLoadingMore ? <Spinner /> : "Load more"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherList;
