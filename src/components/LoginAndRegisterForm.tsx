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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                className="w-full py-4 bg-primary text-text text-[18px] font-bold rounded-xl hover:bg-buttonHover transition-colors duration-200">
                {mode === "register" ? "Register" : "Log In"}
            </button>
        </form>
    );
};

export default LoginAndRegisterForm;
