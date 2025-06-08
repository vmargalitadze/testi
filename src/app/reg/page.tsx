import { Metadata } from "next";

import {
  Card,
  CardContent,

} from "@/components/ui/card";
import SignupForm from "./signupForm";

export const metadata: Metadata = {
  title: "Sign Un",
};

function RegPage() {
  return (
    <div className="w-full py-20 max-w-md mx-auto flex  justify-center">
      <Card className="w-full">
        <CardContent className="space-y-4">
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default RegPage;
