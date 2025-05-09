import Image from "next/image";

async function Page() {



 
 const res = await fetch(`https://fakestoreapi.com/users/1`);
 const user = await res.json();


  return (
    <>
     <div className="p-8">

      <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">მომხმარებელი</h1>
            <div className="flex flex-col md:flex-row lg:flex-row lg:gap-x-[100px]">
          
              <div className="flex-1 order-1 lg:-order-1">
                <Image 
                  alt="..."
                  width={500}
                  height={500}
                  className="max-w-full rounded-lg shadow-lg"
                  src='/john.jpg'
                />
              </div>

              <div className="flex-1 flex flex-col gap-y-5 justify-start">
                <p className="text-[16px] lg:text-[25px] leading-tight text-start  font-semibold">
                სახელი: {user.name.firstname}
                </p>
                <p className="text-[16px] lg:text-[20px] leading-tight text-start  font-semibold">
                გვარი: {user.name.lastname}
                </p>
                <p className="text-[16px] lg:text-[20px] leading-tight text-start  font-semibold">
                ქალაქი: {user.address.city}
                </p>
                <p className="text-[16px] lg:text-[20px] leading-tight text-start  font-semibold">
                ქუჩა: {user.address.street}
                </p>
                <p className="text-[16px] lg:text-[20px] leading-tight text-start  font-semibold">
                ემეილი: {user.email}
                </p>
                <p className="text-[16px] lg:text-[20px] leading-tight text-start  font-semibold">
                ტელ: {user.phone}
                </p>
              </div>
            </div>
          </div>
    </div>
    
    </>
  )
}

export default Page