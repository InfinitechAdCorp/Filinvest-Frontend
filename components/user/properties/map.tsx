"use client";

import { Property } from "@/types/user";
import React from "react";

type Props = {
  property: Property;
};

const Map = ({ property }: Props) => {
  return (
    <>
      <div className="w-full h-[30rem]">
        <h3 className="text-xl sm:text-2xl lg:text-2xl text-primary font-semibold">
          Map
        </h3>

        <div className="flex justify-center h-[90%]">
          {property.map ? (
            <iframe className="w-full h-full mt-2" src={property.map}></iframe>
          ) : (
            <h3 className="text-center text-gray-500 mt-4">
              No Map Found
            </h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Map;
