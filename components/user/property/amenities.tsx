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
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl lg:text-2xl text-primary font-semibold">
          Amenities
        </h3>

        <p className="text-sm text-justify lg:text-medium italic text-gray-900">
          Relax and bond with loved ones right in the neighborhood with our
          healthy leisure amenities.
        </p>

        <div className="flex flex-row flex-wrap gap-5 space-y-1 mt-2">
          {property.amenities ? (
            <>
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
            </>
          ) : (
            <div className="flex justify-center">
              <h3 className="font-semibold">No Amenities Found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Amenities;
