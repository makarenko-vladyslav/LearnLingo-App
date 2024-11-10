"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { authSchema } from "../../utils/authSchema";
import type { AppDispatch } from "../../redux/store";
import InputField from "./InputField";
import PasswordReset from "./PasswordReset";
import Spinner from "../Spinner";
import { handleAuth } from "../../redux/actions/authActions";
import { selectAuthError, selectIsAuthenticated } from "../../redux/selectors";

interface LoginAndRegisterFormProps {
    mode: "login" | "register";
    onRequestClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    password: string;
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
        await dispatch(
            handleAuth({
                mode,
                email: data.email,
                password: data.password,
                name: data.name,
            })
        );
        setLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            onRequestClose();
            router.push("/teachers");
        }
    }, [isAuthenticated, onRequestClose, router]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {mode === "register" && (
                <InputField<FormData>
                    id="name"
                    label="Name"
                    type="text"
                    register={register}
                    error={errors.name?.message}
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

            <p
                className={`text-red-500 text-center mb-3 transition-opacity duration-500 ease-in-out opacity-0 scale-0 pointer-events-none ${
                    authError && "opacity-100 scale-100"
                }`}>
                {authError}
            </p>

            {mode === "login" && <PasswordReset email={email} />}

            <button
                type="submit"
                className={`${
                    mode === "register" && "mt-6"
                } w-full py-4 bg-primary text-text text-[18px] font-medium rounded-xl hover:bg-buttonHover transition-colors duration-200`}
                disabled={loading}>
                {loading ? <Spinner /> : mode === "register" ? "Register" : "Log In"}
            </button>
        </form>
    );
};

export default LoginAndRegisterForm;
