"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { authSchema } from "../validation/authSchema";
import { handleAuth } from "../services/authService";
import InputField from "./InputField";

interface LoginAndRegisterFormProps {
    mode: "login" | "register";
}

interface FormData {
    email: string;
    password: string;
    name?: string;
}

const LoginAndRegisterForm: React.FC<LoginAndRegisterFormProps> = ({ mode }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(authSchema),
    });

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: FormData) => {
        handleAuth(mode, data, dispatch, router);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
            {mode === "register" && (
                <InputField<FormData>
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    error={errors.name?.message}
                    isRequired={mode === "register"}
                />
            )}
            <InputField<FormData>
                id="email"
                label="Email"
                type="email"
                register={register}
                error={errors.email?.message}
            />
            <InputField<FormData>
                id="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password?.message}
            />
            <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                {mode === "register" ? "Register" : "Log In"}
            </button>
        </form>
    );
};

export default LoginAndRegisterForm;
