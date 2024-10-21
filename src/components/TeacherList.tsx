"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { fetchTeachersWithFilters } from "../services/filterService";
import { selectAllTeachers } from "../redux/teachersSlice";
import { FaUserSlash } from "react-icons/fa";
import TeacherItem from "./TeacherCard";
import Spinner from "./Spinner";

const ITEMS_PER_LOAD = 4;

const TeacherList: React.FC = () => {
    const dispatch = useDispatch();
    const teachers = useSelector(selectAllTeachers);
    const filters = useSelector((state: RootState) => state.filters);

    const [initialLoading, setInitialLoading] = useState(true);
    const [visibleTeachers, setVisibleTeachers] = useState(ITEMS_PER_LOAD);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const loadTeachers = async () => {
        try {
            setInitialLoading(true);
            await fetchTeachersWithFilters(filters, dispatch);
        } finally {
            setInitialLoading(false);
        }
    };

    useEffect(() => {
        loadTeachers();
    }, [filters, dispatch]);

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleTeachers((prevVisible) => prevVisible + ITEMS_PER_LOAD);
            setIsLoadingMore(false);
        }, 1000);
    };

    if (initialLoading) {
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
            <ul className="flex flex-col gap-8">
                {teachers.slice(0, visibleTeachers).map((teacher) => (
                    <TeacherItem
                        teacher={teacher}
                        key={teacher.id}
                    />
                ))}
            </ul>

            {visibleTeachers < teachers.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-12 py-4 bg-primary text-text font-bold rounded-xl leading-[156%] hover:bg-buttonHover transition-all duration-200"
                        disabled={isLoadingMore}>
                        {isLoadingMore ? "Loading..." : "Load more"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default TeacherList;
