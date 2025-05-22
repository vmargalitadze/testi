import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min 6 characters")
    .max(12, "Max 12 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/\d/, "At least one number"),
});

export const SignUpSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  firstName: yup.string().min(4).max(20).required("firstName is required"),
  lastName: yup.string().min(4).max(20).required("lastName is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Min 6 characters")
    .max(12, "Max 12 characters")
    .matches(/[A-Z]/, "At least one uppercase letter")
    .matches(/[a-z]/, "At least one lowercase letter")
    .matches(/\d/, "At least one number"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
