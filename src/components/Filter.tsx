"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
    setLanguageFilter,
    setPriceRangeFilter,
    setLevelFilter,
    setAvailableFilters,
    selectAvailablePriceRange,
} from "../redux/filtersSlice";

const Filter: React.FC = () => {
    const dispatch = useDispatch();
    const teachers = useSelector((state: RootState) => state.teachers.teachers);
    const availablePriceRange = useSelector(selectAvailablePriceRange);
    const { availableLanguages, availableLevels } = useSelector((state: RootState) => state.filters);

    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string>("");

    const [filtersSet, setFiltersSet] = useState(false);

    useEffect(() => {
        if (teachers.length > 0 && !filtersSet) {
            dispatch(setAvailableFilters(teachers));
            setFiltersSet(true);
        }
    }, [teachers, dispatch, filtersSet]);

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedLanguage(value);
        dispatch(setLanguageFilter(value));
    };

    const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedLevel(value);
        dispatch(setLevelFilter(value));
    };

    const handlePriceRangeChange = (min: number, max: number) => {
        dispatch(setPriceRangeFilter([min, max]));
    };

    return (
        <div className="flex gap-5 mb-8">
            {/* Language Filter */}
            <div className="inline-flex flex-col gap-2 w-40">
                <label
                    htmlFor="language-select"
                    className="text-sm font-medium">
                    Languages
                </label>
                <select
                    id="language-select"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="border rounded px-4 py-2 bg-white text-black">
                    <option value="">All Languages</option>
                    {availableLanguages.map((language, index) => (
                        <option
                            key={index}
                            value={language}>
                            {language}
                        </option>
                    ))}
                </select>
            </div>

            {/* Level Filter */}
            <div className="inline-flex flex-col gap-2 w-40">
                <label
                    htmlFor="level-select"
                    className="text-sm font-medium">
                    Level of knowledge
                </label>
                <select
                    id="level-select"
                    value={selectedLevel}
                    onChange={handleLevelChange}
                    className="border rounded px-4 py-2 bg-white text-black">
                    <option value="">All Levels</option>
                    {availableLevels.map((level, index) => (
                        <option
                            key={index}
                            value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price Range */}
            <div className="inline-flex flex-col gap-2 w-40">
                <label className="text-sm font-medium">Price</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder={`Min: ${availablePriceRange[0]}$`}
                        className="border rounded px-2 py-1 bg-white text-black"
                        onChange={(e) => handlePriceRangeChange(Number(e.target.value), availablePriceRange[1])}
                    />
                    <input
                        type="number"
                        placeholder={`Max: ${availablePriceRange[1]}$`}
                        className="border rounded px-2 py-1 bg-white text-black"
                        onChange={(e) =>
                            handlePriceRangeChange(
                                availablePriceRange[0],
                                e.target.value === "" ? availablePriceRange[1] : Number(e.target.value)
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
