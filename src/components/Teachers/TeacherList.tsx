"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";

import TeacherCard from "./TeacherCard";
import Spinner from "../Spinner";
import NoTeachersMessage from "./NoTeachersMessage";
import LoadMoreButton from "../LoadMoreButton";
import { fetchTeachersWithFilters } from "../../redux/actions/filtersActions";
import { selectAllTeachers, selectFavoriteTeachers, selectFilters } from "../../redux/selectors";

const ITEMS_PER_LOAD = 4;

interface TeacherListProps {
    favorites?: boolean;
}

const TeacherList: React.FC<TeacherListProps> = ({ favorites = false }) => {
    const dispatch = useDispatch<AppDispatch>();

    const filters = useSelector(selectFilters);
    const allTeachers = useSelector(selectAllTeachers);
    const favoriteTeachers = useSelector(selectFavoriteTeachers);
    const [loading, setLoading] = useState(true);

    const [visibleTeachers, setVisibleTeachers] = useState(ITEMS_PER_LOAD);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const teachers = favorites ? favoriteTeachers : allTeachers;

    useEffect(() => {
        const loadTeachers = async () => {
            setLoading(true);
            await dispatch(fetchTeachersWithFilters());
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

    if (!loading && teachers.length === 0) {
        return <NoTeachersMessage />;
    }

    return loading ? (
        <Spinner
            color="#f4c550"
            fullHeight={true}
        />
    ) : (
        <>
            <ul className="flex flex-col gap-3 lg:gap-8">
                {teachers.slice(0, visibleTeachers).map((teacher) => (
                    <TeacherCard
                        teacher={teacher}
                        key={teacher.id}
                    />
                ))}
            </ul>

            {visibleTeachers < teachers.length && (
                <LoadMoreButton
                    onClick={handleLoadMore}
                    isLoading={isLoadingMore}
                />
            )}
        </>
    );
};

export default TeacherList;
