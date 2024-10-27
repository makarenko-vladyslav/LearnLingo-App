import { Listbox } from "@headlessui/react";
import React from "react";

interface PriceFilterProps {
    selectedPrice: number | null;
    availablePrices: number[];
    onChange: (price: number | null) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ selectedPrice, availablePrices, onChange }) => (
    <div className="inline-flex flex-col gap-2 w-[115px] z-10">
        <label className="text-textGray text-sm font-medium leading-[129%]">Price</label>
        <Listbox
            value={selectedPrice}
            onChange={onChange}>
            <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-xl bg-background py-[14px] px-[18px] text-left shadow-m focus:outline-none text-[18px]">
                    <span className="block truncate font-medium leading-[111%]">
                        {selectedPrice !== null ? `$${selectedPrice}` : "All Prices"}
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-20 mt-1 w-full rounded-xl bg-background py-1 shadow-md focus:outline-none text-[18px] leading-[111%] transition ease-out duration-200">
                    <Listbox.Option
                        className={({ active }) =>
                            `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                active ? " text-primary" : "text-textGray"
                            }`
                        }
                        value={null}>
                        {({ selected }) => (
                            <span
                                className={`block truncate font-medium leading-[111%] hover:text-primary transition-all duration-100 ${
                                    selected ? "text-text" : "text-textGray"
                                }`}>
                                All Prices
                            </span>
                        )}
                    </Listbox.Option>
                    {availablePrices.map((price, index) => (
                        <Listbox.Option
                            key={index}
                            className={({ active }) =>
                                `relative cursor-default select-none py-1 pl-[18px] pr-4 ${
                                    active ? " text-primary" : "text-textGray"
                                }`
                            }
                            value={price}>
                            {({ selected }) => (
                                <span
                                    className={`block truncate font-medium hover:text-primary transition-all duration-100 ${
                                        selected ? "text-text" : "text-textGray"
                                    }`}>
                                    ${price}
                                </span>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </div>
        </Listbox>
    </div>
);

export default PriceFilter;
