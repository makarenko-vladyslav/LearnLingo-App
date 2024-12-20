"use client";

import React, { useState } from "react";
import { FieldValues, UseFormRegister, Path, ValidationRule } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputFieldProps<T extends FieldValues> {
    id: Path<T>;
    label: string;
    type: string;
    register: UseFormRegister<T>;
    error?: string;
    isRequired?: string | ValidationRule<boolean>;
}

const InputField = <T extends FieldValues>({
    id,
    label,
    type,
    register,
    error,
    isRequired = true,
}: InputFieldProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="mb-[18px] last-of-type:mb-2">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-textGray relative">
                <input
                    type={type === "password" && showPassword ? "text" : type}
                    id={id}
                    placeholder={label}
                    {...register(id, { required: isRequired })}
                    className={`p-2 w-full border rounded-xl leading-[137%] placeholder:text-textGray px-[18px] py-4 pr-10
                        ${error ? "border-2 border-red-500" : "border-text10"}`}
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={handleTogglePasswordVisibility}
                        className="absolute -translate-y-1/2 top-1/2 right-3 flex items-center text-textGray">
                        <span className="text-xl">{showPassword ? <FiEye /> : <FiEyeOff />}</span>
                    </button>
                )}
            </label>

            {error && <p className="text-red-500 text-sm ml-3 mt-1.5 inline-block">{error}</p>}
        </div>
    );
};

export default InputField;
