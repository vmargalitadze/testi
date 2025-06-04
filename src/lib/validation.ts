import * as yup from "yup";
import { formatNumberWithDecimal } from "./utils";

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

const currency = yup
  .string()
  .test(
    "is-decimal",
    "Price must have exactly two decimal places",
    (value) =>
      value !== undefined &&
      /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value)))
  );

export const productSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup.number().required("Price is required").positive("Price must be positive"),
  images: yup.array().of(yup.string().required("Image URL is required")).default([]),
});

export type CartItem = yup.InferType<typeof cartItemSchema>;

export const cartItemSchema = yup.object({
  productId: yup.string().required("Product is required"),
  name: yup.string().required("Name is required"),
  qty: yup
    .number()
    .integer("Quantity must be an integer")
    .min(0, "Quantity must be positive number"),
  image: yup.string().required("Image is required"),
  price: currency.required(),
});

export const insertCartSchema = yup.object({
  items: yup.array().of(cartItemSchema).required(),
  itemsPrice: currency.required(),
  shippingPrice: currency.required(),
  taxPrice: currency.required(),
  totalPrice: currency.required(),
  sessionCartId: yup.string().required("Session cart Id is required"),
  userId: yup.string().nullable(),
});
