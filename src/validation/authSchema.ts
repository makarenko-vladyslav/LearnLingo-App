import * as yup from "yup";

export const authSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    name: yup.string().when([], (_, schema) => schema.notRequired()),
});

export const bookSchema = yup.object().shape({
    reason: yup.string().required("Please select your reason for learning English"),
    name: yup
        .string()
        .required("Full name is required")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    number: yup
        .string()
        .required("Phone number is required")
        .matches(/^(\+?\d{1,3})? ?\d{9,12}$/, "Invalid phone number format. Example: +1234567890 or 0991234567"),
});
