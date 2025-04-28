import React from "react";
import { Property } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import Hero from "@/components/globals/hero";
import Body from "@/components/user/set-appointment/body";
import { sortRecords } from "@/utils/formatters";

const Page = async () => {
  let properties: Property[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/main/properties`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    properties = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  properties = properties.filter((property) => {
    return property.isPublished == 1;
  });
  properties = sortRecords(properties, "name");

  return (
    <>
      <Hero image="/images/banner.jpg" title="Set Appointment" />

      <div className="my-7 flex justify-center">
        <Body properties={properties} />
      </div>
    </>
  );
};

export default Page;
