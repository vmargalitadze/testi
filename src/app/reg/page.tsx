import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "./signupForm";

export const metadata: Metadata = {
  title: "Sign Un",
};

function RegPage() {
  return (
    <div className="w-full py-20 max-w-md mx-auto flex  justify-center">
      <Card className="w-full">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-[24px]">Sign In</CardTitle>
          <CardDescription className="text-[18px]">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default RegPage;
