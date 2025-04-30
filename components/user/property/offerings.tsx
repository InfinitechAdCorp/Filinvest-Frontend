"use client";

import { Property } from "@/types/globals";
import { formatNumber } from "@/utils/formatters";
import { Image } from "@heroui/react";

type Props = {
  property: Property;
};

const Offerings = ({ property }: Props) => {
  return (
    <>
      <div className="w-full">
        <h3 className="mb-3 text-xl font-semibold text-primary sm:text-2xl lg:text-2xl">
          Offerings
        </h3>

        {property.offerings.length > 0 ? (
          <div className="flex gap-3">
            {property.offerings.map((offering) => (
              <div key={offering.id} className="flex flex-col space-y-3">
                <div className="relative mt-2 flex max-h-[15.63rem] w-full justify-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/offerings/${offering.image}`}
                    alt="Offering"
                    className="h-auto max-h-full w-full rounded-lg object-contain"
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
