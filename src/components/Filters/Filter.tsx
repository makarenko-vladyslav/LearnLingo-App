"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setLanguageFilter,
    setPriceFilter,
    setLevelFilter,
    setAvailableFilters,
    selectAvailablePriceOptions,
    selectAvailableLanguages,
    selectAvailableLevels,
    selectLevel,
} from "../../redux/filtersSlice";
import { selectAllTeachers } from "../../redux/teachersSlice";

import LanguageFilter from "./LanguageFilter";
import LevelFilter from "./LevelFilter";
import PriceFilter from "./PriceFilter";
import { selectAuthLoading } from "../../redux/authSlice";

const Filter: React.FC = () => {
    const dispatch = useDispatch();
    const teachers = useSelector(selectAllTeachers);
    const availablePriceOptions = useSelector(selectAvailablePriceOptions);
    const availableLanguages = useSelector(selectAvailableLanguages);
    const availableLevels = useSelector(selectAvailableLevels);
    const selectedLevelFromRedux = useSelector(selectLevel);
    const loading = useSelector(selectAuthLoading);

    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string>(selectedLevelFromRedux || "");
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const filtersInitialized = useRef(false);

    useEffect(() => {
        setSelectedLevel(selectedLevelFromRedux || "");
    }, [selectedLevelFromRedux]);

    useEffect(() => {
        if (teachers.length > 0 && !filtersInitialized.current) {
            dispatch(setAvailableFilters(teachers));
            filtersInitialized.current = true;
        }
    }, [teachers, dispatch]);

    if (loading) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-5 mb-8">
            <PriceFilter
                selectedPrice={selectedPrice}
                availablePrices={availablePriceOptions}
                onChange={(price) => {
                    setSelectedPrice(price);
                    dispatch(setPriceFilter(price));
                }}
            />
            <LanguageFilter
                selectedLanguage={selectedLanguage}
                availableLanguages={availableLanguages}
                onChange={(language) => {
                    setSelectedLanguage(language);
                    dispatch(setLanguageFilter(language === "All Languages" ? null : language));
                }}
            />
            <LevelFilter
                selectedLevel={selectedLevel}
                availableLevels={availableLevels}
                onChange={(level) => {
                    setSelectedLevel(level);
                    dispatch(setLevelFilter(level === "All Levels" ? null : level));
                }}
            />
        </div>
    );
};

export default Filter;
