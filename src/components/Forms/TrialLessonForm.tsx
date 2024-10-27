"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { bookSchema } from "../../validation/authSchema";
import InputField from "./InputField";
import { Teacher } from "../../redux/teachersSlice";
import Image from "next/image";
import RadioButton from "./RadioButton";

interface BookingFormData {
    reason: string;
    name: string;
    email: string;
    number: string;
}

interface TrialLessonFormProps {
    teacher: Teacher;
    onRequestClose: () => void;
}

export default function TrialLessonForm({ onRequestClose, teacher }: TrialLessonFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: yupResolver(bookSchema),
    });

    const onSubmit = () => {
        toast.success("Trial lesson successfully booked!", {
            position: "top-center",
            autoClose: 4000,
        });

        onRequestClose();
    };

    return (
        <>
            {teacher && (
                <div className="flex gap-3 mb-10">
                    {teacher.avatar_url ? (
                        <Image
                            src={teacher.avatar_url}
                            alt={`${teacher.name} ${teacher.surname}`}
                            width={44}
                            height={44}
                            className="rounded-full h-fit"
                        />
                    ) : (
                        <span className="w-12 h-12 rounded-full bg-secondary flex self-start justify-center items-center text-xl text-text">
                            {teacher.name[0].toUpperCase()}
                        </span>
                    )}

                    <div className="flex flex-col justify-center">
                        <p className="text-xs mb-0.5 text-textGray leading-normal">Your teacher</p>
                        <p className="leading-normal">{teacher.name + " " + teacher.surname}</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Reason Radio Buttons */}
                <div className="flex flex-col gap-4 mb-10 relative">
                    <h2 className="text-2xl font-medium leading-[133%] mb-1">
                        What is your main reason for learning English?
                    </h2>

                    <RadioButton
                        id="career"
                        name="reason"
                        value="Career and business"
                        register={register}
                    />

                    <RadioButton
                        id="kids"
                        name="reason"
                        value="Lesson for kids"
                        register={register}
                    />

                    <RadioButton
                        id="abroad"
                        name="reason"
                        value="Living abroad"
                        register={register}
                    />
                    <RadioButton
                        id="exams"
                        name="reason"
                        value="Exams and coursework"
                        register={register}
                    />

                    <RadioButton
                        id="culture"
                        name="reason"
                        value="Culture, travel or hobby"
                        register={register}
                    />
                    {errors.reason && (
                        <p className="text-red-500 text-sm absolute -bottom-7 left-3">{errors.reason.message}</p>
                    )}
                </div>

                {/* Name Field */}
                <InputField<BookingFormData>
                    id="name"
                    label="Full Name"
                    type="text"
                    register={register}
                    error={errors.name?.message}
                />

                {/* Email Field */}
                <InputField<BookingFormData>
                    id="email"
                    label="Email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                />

                {/* Phone Number Field */}
                <InputField<BookingFormData>
                    id="number"
                    label="Phone number"
                    type="tel"
                    register={register}
                    error={errors.number?.message}
                />

                <button
                    type="submit"
                    className="w-full bg-primary text-text text-lg font-bold py-3.5 rounded-xl hover:bg-buttonHover transition-all duration-200">
                    Book
                </button>
            </form>
        </>
    );
}
