"use client";

import React from "react";
import { Property } from "@/types/user";
import { Image } from "@heroui/react";
import { formatNumber } from "@/utils/formatters";

type Props = {
  property: Property;
};

const Offerings = ({ property }: Props) => {
  return (
    <>
      <div className="w-full">
        <h3 className="text-xl sm:text-2xl lg:text-2xl text-primary font-semibold mb-3">
          Offerings
        </h3>

        {property.offerings.length > 0 ? (
          <div className="flex gap-3">
            {property.offerings.map((offering) => (
              <div key={offering.id} className="flex flex-col space-y-3">
                <div className="relative w-full flex justify-center mt-2 max-h-[15.63rem]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/offerings/${offering.image}`}
                    alt="Offering"
                    className="w-full h-auto max-h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-1 text-center">
                  <h3 className="font-bold">{offering.type}</h3>
                  <h3>{`Area: ${formatNumber(offering.minimum_area)} - ${formatNumber(offering.maximum_area)} sqm`}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <h3 className="font-semibold">No Offerings Found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Offerings;
