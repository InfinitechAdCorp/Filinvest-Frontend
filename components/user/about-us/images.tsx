"use client";

import React from "react";
import { Image } from "@heroui/react";

const Images = () => {
  return (
    <>
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="relative w-full space-y-5">
          <div className="flex justify-center">
            <Image
              src="/images/about-us-1.png"
              alt="Image"
              className="rounded-lg shadow-lg object-cover w-[34rem] h-[15rem] transform transition duration-500 ease-in-out hover:scale-110"
            />
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/about-us-2.jpg"
              alt="Image"
              className="rounded-lg shadow-lg object-cover w-[34rem] h-[15rem] transform transition duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
