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
        <div className="mb-[18px] last-input-mb-10 relative">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"></label>
            <input
                type={type === "password" && showPassword ? "text" : type}
                id={id}
                placeholder={label}
                {...register(id, { required: isRequired })}
                className="p-2 w-full border border-text10 rounded-xl leading-[137%] placeholder:text-text px-[18px] py-4 pr-10"
            />
            {type === "password" && (
                <button
                    type="button"
                    onClick={handleTogglePasswordVisibility}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500">
                    <span className="text-xl">{showPassword ? <FiEye /> : <FiEyeOff />}</span>
                </button>
            )}
            {error && <p className="text-red-500 text-sm ml-3 mt-1.5">{error}</p>}
        </div>
    );
};

export default InputField;
