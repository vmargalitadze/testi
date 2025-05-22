"use client";

import React, { useEffect, useState } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { signInWithCredentials } from "@/lib/actions/user.actions";

type LoginFormState = {
  success: boolean;
  message: string;
  email: string;
  errors: Record<string, string>;
};

const initialState: LoginFormState = {
  success: false,
  message: "",
  email: "",
  errors: {},
};

function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    signInWithCredentials,
    initialState
  );
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      setRedirecting(true);
      router.push("/");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="max-w-md mx-auto mt-10 space-y-6 bg-white p-6 rounded shadow"
    >
      <div>
        <label htmlFor="email" className="block font-semibold">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue=""
          className="border border-gray-300 rounded w-full p-2"
          required
        />
        {state?.errors?.email && (
          <p className="text-red-600 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block font-semibold">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue=""
          className="border border-gray-300 rounded w-full p-2"
          required
        />
        {state?.errors?.password && (
          <p className="text-red-600 text-sm">{state.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending || redirecting}
        className="bg-[#232F3E] cursor-pointer text-white px-4 py-2 rounded w-full"
      >
        {redirecting
          ? "Redirecting..."
          : isPending
          ? "Submitting..."
          : "Sign In"}
      </button>

      {state.message && (
        <p className="text-center mt-4 font-medium">{state.message}</p>
      )}
    </form>
  );
}

export default LoginForm;
