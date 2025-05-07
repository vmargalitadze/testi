"use client";

import Image from "next/image";

import { useEffect, useState } from "react";
import slides from "./SlidesItem";
function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col xl:flex-row`}
            key={slide.id}
          >
            <div className="h-1/2 xl:w-1/2 xl:h-full lg:mt-0 mt-4 flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
              <h2 className="text-xl lg:text-2xl text-black 2xl:text-3xl">
                {slide.description}
              </h2>
              <h1 className="text-2xl text-black lg:text-4xl 2xl:text-6xl font-semibold">
                {slide.title}
              </h1>
            </div>

            <div className="h-1/2 xl:w-1/2 xl:h-full relative">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 flex items-center justify-center mx-auto gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3   rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-black rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
