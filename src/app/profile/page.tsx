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
      <div className="p-8 uppercase">
        <div className="container mx-auto">
          <h1 className="text-[60px] font-bold mb-6">User</h1>
          <div className="flex flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
            <div className="lg:w-[58%] h-[500px] relative overflow-hidden rounded-md">
              <Image
                alt="Profile picture"
                fill
                className="object-cover rounded-md"
                
                src={session.user.image || "/john.jpg"}
              />
            </div>

            <div className="flex-1 flex flex-col gap-y-5 justify-start">
              <p className="text-[16px] lg:text-[18px] leading-tight text-start font-semibold">
                Name: {session.user.firstName || "უცნობია"}
              </p>
              <p className="text-[16px] lg:text-[18px] leading-tight text-start font-semibold">
                Surname: {session.user.lastName || "უცნობია"}
              </p>
              <p className="text-[16px]  lg:text-[18px] leading-tight text-start font-semibold">
                Email: {session.user.email || "უცნობია"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
