import { Listbox } from "@headlessui/react";
import React from "react";

interface LanguageFilterProps {
    selectedLanguage: string;
    availableLanguages: string[];
    onChange: (language: string) => void;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({ selectedLanguage, availableLanguages, onChange }) => (
    <li className="inline-flex flex-col gap-2 w-[225px]">
        <label className="text-textGray text-sm font-medium leading-[129%]">Languages</label>
        <Listbox
            value={selectedLanguage}
            onChange={onChange}>
            <div className="relative mt-1 ">
                <Listbox.Button className="relative w-full cursor-default rounded-xl bg-background py-[14px] px-[18px] text-left shadow-sm focus:outline-none text-[18px]">
                    <span className="block truncate font-medium leading-[111%]">
                        {selectedLanguage || "All Languages"}
                    </span>
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
                                All Languages
                            </span>
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
                                <span
                                    className={`block truncate font-medium hover:text-primary transition-all duration-100 ${
                                        selected ? "text-text" : "text-textGray"
                                    }`}>
                                    {language}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    </li>
);

export default LanguageFilter;
