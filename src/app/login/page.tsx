import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Form from "./Form";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Sign In",
};

function LoginPage() {
  return (
    <div className="w-full py-20 max-w-md mx-auto flex  justify-center">
      <Card className="w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form />
        </CardContent>
        <Link
          href="/reg"
          className="text-center font-medium underline hover:no-underline transition duration-200"
        >
          არ გაქ აქაუნთი? დარეგისტრირდი
        </Link>
      </Card>
    </div>
  );
}

export default LoginPage;
