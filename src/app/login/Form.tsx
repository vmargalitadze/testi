"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);

    try {
      const result = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,
      });

      if (result?.error) {
        if (result.error === "CredentialsSignin") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred during login. Please try again.");
        }
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto uppercase space-y-6 bg-white p-6 rounded shadow"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block font-semibold">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="border uppercase border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block font-semibold">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border uppercase border-gray-300 rounded w-full p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-[#232F3E] hover:text-amber-400  text-[18px] uppercase  cursor-pointer text-white px-4 py-2 rounded w-full"
      >
        Sign In
      </button>
    </form>
  );
}

export default LoginForm;
