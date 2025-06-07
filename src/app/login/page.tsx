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
          <CardTitle className="text-[24px]" >Sign In</CardTitle>
          <CardDescription className="text-[18px]" >Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form />
        </CardContent>
        <Link
          href="/reg"
          className="text-center uppercase font-medium underline hover:no-underline transition duration-200"
        >
         Don&#39;t have an account? Sign up
        </Link>
      </Card>
    </div>
  );
}

export default LoginPage;
