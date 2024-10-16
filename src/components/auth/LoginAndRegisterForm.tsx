"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { authSchema } from "../../validation/authSchema";
import { handleAuth } from "../../services/authService";
import InputField from "./InputField";
import { selectAuthError, selectIsAuthenticated } from "../../redux/authSlice";
import PasswordReset from "./PasswordReset";
import Spinner from "../Spinner";

interface LoginAndRegisterFormProps {
    mode: "login" | "register";
    onRequestClose: () => void;
}

interface FormData {
    email: string;
    password: string;
    name?: string;
}

const LoginAndRegisterForm: React.FC<LoginAndRegisterFormProps> = ({ mode, onRequestClose }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(authSchema),
    });

    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const authError = useSelector(selectAuthError);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [loading, setLoading] = useState(false);

    const email = watch("email");

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        await dispatch(handleAuth(mode, data, router));
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            onRequestClose();
        }
    }, [isAuthenticated, onRequestClose]);

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

            {mode === "login" && <PasswordReset email={email} />}

            <InputField<FormData>
                id="password"
                label="Password"
                type="password"
                register={register}
                error={errors.password?.message}
            />

            {authError && <p className="text-red-600 mb-4">{authError}</p>}

            <button
                type="submit"
                className="w-full py-4 bg-primary text-text text-[18px] font-medium rounded-xl hover:bg-buttonHover transition-colors duration-200"
                disabled={loading}>
                {loading ? <Spinner /> : mode === "register" ? "Register" : "Log In"}
            </button>
        </form>
    );
};

export default LoginAndRegisterForm;
