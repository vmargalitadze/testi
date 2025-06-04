import { auth } from "@/auth";
import Api from "@/components/Api/Api";
import Slider from "@/components/Slider/Slider";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  
  return (
  <>
  
  <Slider />
  <Api /> 
  </>
  );
}

