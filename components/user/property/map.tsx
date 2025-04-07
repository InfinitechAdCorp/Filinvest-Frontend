"use client";

import { Property } from "@/types/globals";
import React from "react";

type Props = {
  property: Property;
};

const Map = ({ property }: Props) => {
  return (
    <>
      <div className="w-full h-[30rem]">
        {property.map ? (
          <div className="flex justify-center h-[97%]">
            <iframe className="w-full h-full mt-2" src={property.map}></iframe>
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
