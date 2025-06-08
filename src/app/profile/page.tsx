import Image from "next/image";
import { auth } from "@/auth";

async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">
            გთხოვთ გაიაროთ ავტორიზაცია
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="container mx-auto min-h-screen">
          <h1 className="text-2xl uppercase text-black lg:text-4xl 2xl:text-6xl font-bold  mb-6 ">
            User
          </h1>
          <div className="flex flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
            <div className="lg:w-[40%] h-[400px] relative overflow-hidden rounded-md">
              <Image
                alt="Profile picture"
                fill
                className="object-cover rounded-md"
                src={session.user.image || "/john.jpg"}
              />
            </div>

            <div className="flex-1 flex flex-col gap-y-5 justify-start">
              <p className="text-[16px] lg:text-[24px] leading-tight text-start ">
                <span className="uppercase font-bold">NAME:</span>
              {" "}  {session.user.firstName || "უცნობია"}
              </p>
              <p className="text-[16px] lg:text-[24px] leading-tight text-start ">
                <span className="uppercase font-bold">LAST NAME:</span>
                {" "} {session.user.lastName || "უცნობია"}
              </p>
              <p className="text-[16px]  lg:text-[24px] leading-tight text-start ">
                <span className="uppercase font-bold">EMAIL:</span>
              {" "}  {session.user.email || "უცნობია"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
