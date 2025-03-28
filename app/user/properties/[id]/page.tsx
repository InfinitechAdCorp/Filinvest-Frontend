import React from "react";
import { Property } from "@/types/user";
import axios from "axios";
import toast from "react-hot-toast";
import Details from "@/components/user/properties/details";
import Amenities from "@/components/user/properties/amenities";
import Offerings from "@/components/user/properties/offerings";
import Map from "@/components/user/properties/map";

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
          <div className="relative flex flex-col items-start justify-start mx-60 my-5 max-w-[56.25rem] space-y-5">
            <Details property={property} />
            <Amenities property={property} />
            <Map property={property} />
            <Offerings property={property} />
          </div>
        </div>
      ) : (
        <h3 className="text-xl font-bold">Property Not Found</h3>
      )}
    </>
  );
};

export default PropertyDetails;
