"use client";

import { Image } from "@heroui/react";

const Images = () => {
  return (
    <>
      <div className="relative flex w-full justify-center md:w-1/2">
        <div className="relative w-full space-y-5">
          <div className="flex justify-center">
            <Image
              src="/images/about-us-1.png"
              alt="Image"
              className="h-[15rem] w-[34rem] rounded-lg object-cover shadow-lg"
            />
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/about-us-2.jpg"
              alt="Image"
              className="h-[15rem] w-[34rem] rounded-lg object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
