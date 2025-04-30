"use client";

import { Property } from "@/types/globals";

type Props = {
  property: Property;
};

const Map = ({ property }: Props) => {
  return (
    <>
      <div className="h-[30rem] w-full">
        {property.map ? (
          <div className="flex h-[97%] justify-center">
            <iframe className="mt-2 h-full w-full" src={property.map}></iframe>
          </div>
        ) : (
          <div className="flex justify-center">
            <h3 className="font-semibold">No Map Found</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
