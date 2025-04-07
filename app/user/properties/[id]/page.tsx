import React from "react";
import { Property } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import Details from "@/components/user/property/details";
import Amenities from "@/components/user/property/amenities";
import Offerings from "@/components/user/property/offerings";
import Map from "@/components/user/property/map";

const PropertyDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  let property: Property | null = null;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    property = response.data.record;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  return (
    <>
      {property ? (
        <div className="flex justify-center w-full">
          <div className="relative flex flex-col items-start justify-start mx-60 my-7 max-w-[57rem] space-y-5">
            <Details property={property} />
            <Amenities property={property} />
            <Map property={property} />
            <Offerings property={property} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h3 className="font-semibold">Property Not Found</h3>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;
