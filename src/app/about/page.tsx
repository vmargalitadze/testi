import React from "react";
import Image from "next/image";
function page() {
  return (
    <>
      <div className="mt-[40px] rounded-md pb-[70px]">
        <div className="container">
          <div className="max-w-[1720px] gap-3 mx-auto grid grid-cols-1 lg:grid-cols-2">
         
            <div className="relative w-full h-[550px]  ">
              <Image
                src="/slider/1.jpg"
                alt="about"
                fill
                className="object-cover rounded-md"
              />
            </div>

          
            <div className="py-8 rounded-md sm:py-12 px-5 sm:px-12 md:px-8 lg:pr-12 lg:pl-16 2xl:pl-[160px] bg-[#F8F8F9]">
              <div className="lg:max-w-[600px] rounded-3xl text-center">
                <h3 className="font-medium leading-none text-2xl md:text-3xl">
                  About Us
                </h3>
                <p className="mt-3 text-base sm:text-lg">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Pariatur nam illum asperiores dolore deleniti in libero
                  consectetur soluta? Error ab dolores corrupti accusantium
                  maiores molestias doloribus fuga enim facilis sapiente
                  perferendis accusamus, explicabo inventore tempore qui libero.
                  Repudiandae, quae tenetur?
                </p>
                <p className="mt-3 text-base sm:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam aspernatur earum dicta, deserunt ex facilis, maxime
                  debitis, vero maiores ullam atque reiciendis temporibus est!
                  Nesciunt ad repellat quidem. Illum impedit accusamus
                  perferendis corrupti rem perspiciatis consectetur atque
                  distinctio doloremque quisquam.
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
