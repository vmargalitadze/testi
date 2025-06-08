import { Metadata } from "next";

import {
  Card,
  CardContent,

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
