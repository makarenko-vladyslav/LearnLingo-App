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
    <div className="mb-4">
        <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            type={type}
            id={id}
            {...register(id, { required: isRequired })}
            className="mt-1 p-2 w-full border rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default InputField;
