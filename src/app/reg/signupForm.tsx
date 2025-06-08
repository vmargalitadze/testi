"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useActionState } from "react";
import { signUpUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const signUpDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialState = {
  success: false,
  email: "",
  password: "",
  message: "",
};

function SignupForm() {
  const [state, formAction, isPending] = useActionState(
    signUpUser,
    initialState
  );
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      setRedirecting(true);
      router.push("/login");
    }
  }, [state, router]);

  return (
    <form
      action={formAction}
      className="space-y-6 w-[300px] uppercase bg-white p-6 rounded shadow max-w-md mx-auto "
    >
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          className="uppercase"
          id="firstName"
          name="firstName"
          type="text"
          defaultValue={signUpDefaultValues.firstName}
        />
        {state?.errors?.firstName && (
          <p className="text-sm text-red-500">{state.errors.firstName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          className="uppercase"
          defaultValue={signUpDefaultValues.lastName}
        />
        {state?.errors?.lastName && (
          <p className="text-sm text-red-500">{state.errors.lastName}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          defaultValue={signUpDefaultValues.email}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="uppercase"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          defaultValue={signUpDefaultValues.password}
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className="uppercase"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="uppercase"
          defaultValue={signUpDefaultValues.confirmPassword}
        />
        {state?.errors?.confirmPassword && (
          <p className="text-sm text-red-500">{state.errors.confirmPassword}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending || redirecting}
        className="w-[250px] hover:text-amber-400 text-[18px] uppercase cursor-pointer"
      >
        {redirecting
          ? "Redirecting..."
          : isPending
          ? "Submitting..."
          : "Sign Up"}
      </Button>
    </form>
  );
}

export default SignupForm;
