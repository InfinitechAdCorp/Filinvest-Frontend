"use client";

import { Property } from "@/types/globals";
import { HiMiniStar } from "react-icons/hi2";

type Props = {
  property: Property;
};

const Amenities = ({ property }: Props) => {
  return (
    <>
      <div className="w-full">
        <h3 className="text-xl font-semibold text-primary sm:text-2xl lg:text-2xl">
          Amenities
        </h3>

        <p className="text-justify text-sm italic text-gray-900 lg:text-medium">
          Relax and bond with loved ones right in the neighborhood with our
          healthy leisure amenities.
        </p>

        <div className="mt-2 flex flex-row flex-wrap gap-5">
          {property.amenities ? (
            <>
              {JSON.parse(property.amenities).map(
                (amenity: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 text-medium lg:text-lg"
                  >
                    <HiMiniStar className="h-6 w-6 font-semibold text-primary" />
                    <h3>{amenity}</h3>
                  </div>
                ),
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
