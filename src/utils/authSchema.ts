import * as yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const authSchema = yup.object().shape({
    name: yup
        .string()
        .required("Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
        .when([], (_, schema) => schema.notRequired()),
    email: yup.string().matches(emailRegex, "Please enter a valid email address").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password cannot exceed 20 characters")
        .required("Password is required")
        .when([], (_, schema) => schema.notRequired()),
});

export const bookSchema = yup.object().shape({
    reason: yup.string().required("Please select your reason for learning English"),
    name: yup
        .string()
        .required("Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: yup.string().matches(emailRegex, "Please enter a valid email address").required("Email is required"),
    number: yup
        .string()
        .required("Phone number is required")
        .matches(/^(\+?\d{1,3})? ?\d{9,12}$/, "Invalid phone number format. Example: +1234567890 or 0991234567"),
});
