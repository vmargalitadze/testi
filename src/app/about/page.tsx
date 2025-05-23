import React from "react";
import Image from "next/image";
function page() {
  return (
    <>
      <div className="pt-[70px]  pb-[70px]">
        <div className="container">
          <div className="max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-2 ">
            <div className="w-full h-full">
              <Image
                width={860}
                height={960}
                className="object-cover rounded-md w-full h-full"
                alt="about"
                src="/slider/1.jpg"
              />
            </div>

            <div className="flex items-center py-8 sm:py-12 px-5 sm:px-12 md:px-8 lg:pr-12 lg:pl-16 2xl:pl-[160px] bg-[#F8F8F9] ">
              <div className="lg:max-w-[600px] text-center ">
                <h3 className="font-medium leading-none mt-4 md:mt-6 text-2xl md:text-3xl">
                  About Us
                </h3>
                <p className="mt-3 text-base sm:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod,
                  aliquid? Corporis, ex ratione voluptates, id porro quibusdam
                  architecto neque cupiditate perspiciatis quis aliquid deleniti
                  incidunt, explicabo ea sapiente ab? Quidem corporis deserunt
                  officia voluptas harum ipsum quas in veritatis veniam
                  officiis, eveniet totam distinctio quasi velit sint id
                  aspernatur facilis!
                </p>
                <p className="mt-3 text-base sm:text-lg">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Consequuntur, iusto necessitatibus ipsa praesentium quis
                  voluptatem incidunt veniam pariatur nulla cumque nisi placeat
                  et officiis omnis quas excepturi. Necessitatibus doloremque
                  beatae fugit repellendus mollitia earum? Facilis distinctio
                  qui recusandae dolor architecto amet in sequi hic culpa,
                  blanditiis neque, quae velit voluptas ipsam! Praesentium quam
                  blanditiis voluptatum beatae.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
