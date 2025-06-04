/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import * as yup from "yup";

import { signIn, signOut } from "../../auth";
import { hash } from "../encrypt";
import { prisma } from "@/components/db/prisma";
import { SignInSchema, SignUpSchema } from "../validation";

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = await SignInSchema.validate(
      {
        email: formData.get("email"),
        password: formData.get("password"),
      },
      { abortEarly: false }
    );


    const result = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    if (result?.error) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
 
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) errors[err.path] = err.message;
      });

      return {
        success: false,
        message: "Validation failed",
        errors,
      };
    }

    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}


export async function signUpUser(prevState: any, formData: FormData) {
  try {
    const user = SignUpSchema.validateSync(
      {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
      },
      { abortEarly: false }
    );

    const hashedPassword = await hash(user.password);

    await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
      },
    });

    return {
      success: true,
      message: "Registration successful",
    };
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const validationErrors: Record<string, string> = {};
      error.inner.forEach((err: yup.ValidationError) => {
        if (err.path) validationErrors[err.path] = err.message;
      });

      return {
        success: false,
        errors: validationErrors,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function signOutUser() {
  try {
    await signOut();
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, message: "Failed to sign out" };
  }
}
