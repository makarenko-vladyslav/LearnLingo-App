"use client";

import { UseFormRegister, Path } from "react-hook-form";

interface BookingFormData {
    reason: string;
    name: string;
    email: string;
    number: string;
}

interface RadioButtonProps {
    name: Path<BookingFormData>;
    value: string;
    id: string;
    register: UseFormRegister<BookingFormData>;
}

export default function RadioButton({ name, value, id, register }: RadioButtonProps) {
    return (
        <div className="inline-flex items-center cursor-pointer">
            <label
                className="relative flex items-center cursor-pointer"
                htmlFor={id}>
                <input
                    type="radio"
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border border-text20 checked:border-primary transition-all"
                    id={id}
                    {...register(name)}
                    value={value}
                />
                <span className="custom-radio"></span>
                <span className="ml-2 font-medium cursor-pointer">{value}</span>
            </label>
        </div>
    );
}
