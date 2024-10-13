import React from "react";
import { FieldValues, UseFormRegister, Path, ValidationRule } from "react-hook-form";

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
}: InputFieldProps<T>) => (
    <div className="mb-[18px] last-input-mb-10">
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"></label>
        <input
            type={type}
            id={id}
            placeholder={label}
            {...register(id, { required: isRequired })}
            className="p-2 w-full border border-text10 rounded-xl leading-[137%] placeholder:text-text px-[18px] py-4"
        />
        {error && <p className="text-red-500 text-sm ml-3 mt-1.5">{error}</p>}
    </div>
);

export default InputField;
