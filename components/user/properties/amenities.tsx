"use client";

import React from "react";
import { Property } from "@/types/user";
import { HiCheck } from "react-icons/hi2";

type Props = {
  property: Property;
};

const Amenities = ({ property }: Props) => {
  return (
    <>
      <div className="relative flex flex-col items-start justify-start mx-60 my-5">
        <h1 className="text-xl sm:text-2xl lg:text-2xl text-primary font-semibold">
          Amenities
        </h1>

        <p className="text-sm text-justify lg:text-medium italic text-gray-900">
          Relax and bond with loved ones right in the neighborhood with our
          healthy leisure amenities.
        </p>

        <div className="flex flex-col gap-2 space-y-1 mt-2 max-h[5rem]">
          {JSON.parse(property.amenities).map(
            (amenity: string, index: number) => (
              <div
                key={index}
                className="flex gap-1 items-center text-medium lg:text-lg"
              >
                <HiCheck className="w-6 h-6 lg:w-7 lg:h-7 text-primary font-semibold" />
                <p>{amenity}</p>
              </div>
            )
          )}
          {JSON.parse(property.amenities).map(
            (amenity: string, index: number) => (
              <div
                key={index}
                className="flex gap-1 items-center text-medium lg:text-lg"
              >
                <HiCheck className="w-6 h-6 lg:w-7 lg:h-7 text-primary font-semibold" />
                <p>{amenity}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Amenities;
