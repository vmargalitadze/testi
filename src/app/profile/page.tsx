import Image from "next/image";
import { auth } from "@/auth";

async function Page() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">გთხოვთ გაიაროთ ავტორიზაცია</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">მომხმარებელი</h1>
          <div className="flex flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
            <div className="flex-1 order-1 lg:-order-1">
              <Image
                alt="Profile picture"
                width={500}
                height={500}
                className="max-w-full rounded-lg shadow-lg"
                src={session.user.image || "/john.jpg"}
              />
            </div>

            <div className="flex-1 flex flex-col gap-y-5 justify-start">
              <p className="text-[16px] lg:text-[25px] leading-tight text-start font-semibold">
                სახელი: {session.user.firstName || "უცნობია"}
              </p>
              <p className="text-[16px] lg:text-[20px] leading-tight text-start font-semibold">
                გვარი: {session.user.lastName || "უცნობია"}
              </p>
              <p className="text-[16px] lg:text-[20px] leading-tight text-start font-semibold">
                ემეილი: {session.user.email || "უცნობია"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
