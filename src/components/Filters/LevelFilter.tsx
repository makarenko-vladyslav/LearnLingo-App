import { Listbox } from "@headlessui/react";
import React from "react";

interface LevelFilterProps {
    selectedLevel: string;
    availableLevels: string[];
    onChange: (level: string) => void;
}

const LevelFilter: React.FC<LevelFilterProps> = ({ selectedLevel, availableLevels, onChange }) => (
    <div className="inline-flex flex-col gap-2 w-[225px]">
        <label className="text-textGray text-sm font-medium leading-[129%]">Level of knowledge</label>
        <Listbox
            value={selectedLevel}
            onChange={onChange}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-xl bg-background py-[14px] px-[18px] text-left shadow-sm focus:outline-none text-[18px]">
                    <span className="block truncate font-medium leading-[111%]">{selectedLevel || "All Levels"}</span>
                </Listbox.Button>

                <Listbox.Options className="absolute z-20 mt-1 w-full rounded-xl bg-background py-1 shadow-md focus:outline-none text-[18px] leading-[111%] transition ease-out duration-200">
                    <Listbox.Option
                        className={({ active }) =>
                            `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                active ? " text-primary" : "text-textGray"
                            }`
                        }
                        value="">
                        {({ selected }) => (
                            <span
                                className={`block truncate font-medium leading-[111%] hover:text-primary transition-all duration-100 ${
                                    selected ? "text-text" : "text-textGray"
                                }`}>
                                All Levels
                            </span>
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
                                <span
                                    className={`block truncate font-medium hover:text-primary transition-all duration-100 ${
                                        selected ? "text-text" : "text-textGray"
                                    }`}>
                                    {level}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    </div>
);

export default LevelFilter;
