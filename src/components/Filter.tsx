"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
    setLanguageFilter,
    setPriceFilter,
    setLevelFilter,
    setAvailableFilters,
    selectAvailablePriceOptions,
    selectAvailableLanguages,
    selectAvailableLevels,
} from "../redux/filtersSlice";

import { Listbox } from "@headlessui/react";

const Filter: React.FC = () => {
    const dispatch = useDispatch();
    const teachers = useSelector((state: RootState) => state.teachers.teachers);
    const availablePriceOptions = useSelector(selectAvailablePriceOptions);
    const availableLanguages = useSelector(selectAvailableLanguages);
    const availableLevels = useSelector(selectAvailableLevels);

    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

    const filtersInitialized = useRef(false);

    useEffect(() => {
        if (teachers.length > 0 && !filtersInitialized.current) {
            dispatch(setAvailableFilters(teachers));
            filtersInitialized.current = true;
        }
    }, [teachers, dispatch]);

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(language);
        dispatch(setLanguageFilter(language === "All Languages" ? null : language));
    };

    const handleLevelChange = (level: string) => {
        setSelectedLevel(level);
        dispatch(setLevelFilter(level === "All Levels" ? null : level));
    };

    const handlePriceChange = (price: number | null) => {
        setSelectedPrice(price);
        dispatch(setPriceFilter(price));
    };

    return (
        <div className="flex gap-5 mb-8">
            {/* Language Filter */}
            <div className="inline-flex flex-col gap-2 w-[220px]">
                <label className="text-textGray text-sm font-medium leading-[129%]">Languages</label>
                <Listbox
                    value={selectedLanguage}
                    onChange={handleLanguageChange}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-[14px] px-[18px] text-left shadow-sm focus:outline-none text-[18px]">
                            <span className="block truncate font-bold leading-[111%]">
                                {selectedLanguage || "All Languages"}
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-full rounded-xl bg-white py-1 shadow-sm focus:outline-none text-[18px] leading-[111%] transition ease-out duration-200">
                            <Listbox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                        active ? " text-primary" : "text-textGray"
                                    }`
                                }
                                value="">
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate font-bold leading-[111%] hover:text-primary transition-all duration-100 ${
                                                selected ? "text-text" : "text-textGray"
                                            }`}>
                                            All Languages
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>

                            {availableLanguages.map((language, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                            active ? " text-primary" : "text-textGray"
                                        }`
                                    }
                                    value={language}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate font-bold hover:text-primary transition-all duration-100 ${
                                                    selected ? "text-text" : "text-textGray"
                                                }`}>
                                                {language}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>

            {/* Level Filter */}
            <div className="inline-flex flex-col gap-2 w-[220px]">
                <label className="text-textGray text-sm font-medium leading-[129%]">Level of knowledge</label>
                <Listbox
                    value={selectedLevel}
                    onChange={handleLevelChange}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-[14px] px-[18px] text-left shadow-sm focus:outline-none text-[18px]">
                            <span className="block truncate font-bold leading-[111%]">
                                {selectedLevel || "All Levels"}
                            </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute mt-1 w-full rounded-xl bg-white py-1 shadow-sm focus:outline-none text-[18px] leading-[111%] transition ease-out duration-200">
                            <Listbox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                        active ? " text-primary" : "text-textGray"
                                    }`
                                }
                                value="">
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate font-bold leading-[111%] hover:text-primary transition-all duration-100 ${
                                                selected ? "text-text" : "text-textGray"
                                            }`}>
                                            All Levels
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>

                            {availableLevels.map((level, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                            active ? " text-primary" : "text-textGray"
                                        }`
                                    }
                                    value={level}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate font-bold hover:text-primary transition-all duration-100 ${
                                                    selected ? "text-text" : "text-textGray"
                                                }`}>
                                                {level}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>

            {/* Price Filter */}
            <div className="inline-flex flex-col gap-2 w-[220px]">
                <label className="text-textGray text-sm font-medium leading-[129%]">Price</label>
                <Listbox
                    value={selectedPrice}
                    onChange={handlePriceChange}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl bg-white py-[14px] px-[18px] text-left shadow-sm focus:outline-none text-[18px]">
                            <span className="block truncate font-bold leading-[111%]">
                                {selectedPrice !== null ? `$${selectedPrice}` : "All Prices"}
                            </span>
                        </Listbox.Button>

                        <Listbox.Options className="absolute mt-1 w-full rounded-xl bg-white py-1 shadow-sm focus:outline-none text-[18px] leading-[111%] transition ease-out duration-200">
                            <Listbox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                        active ? " text-primary" : "text-textGray"
                                    }`
                                }
                                value={null}>
                                {({ selected }) => (
                                    <>
                                        <span
                                            className={`block truncate font-bold leading-[111%] hover:text-primary transition-all duration-100 ${
                                                selected ? "text-text" : "text-textGray"
                                            }`}>
                                            All Prices
                                        </span>
                                    </>
                                )}
                            </Listbox.Option>

                            {availablePriceOptions.map((price, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                            active ? " text-primary" : "text-textGray"
                                        }`
                                    }
                                    value={price}>
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate font-bold hover:text-primary transition-all duration-100 ${
                                                    selected ? "text-text" : "text-text20"
                                                }`}>
                                                ${price}
                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
            </div>
        </div>
    );
};

export default Filter;
