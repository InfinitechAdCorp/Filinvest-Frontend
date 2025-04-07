import React from "react";
import Hero from "@/components/globals/hero";
import { Property } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "@/components/user/properties/body";

const Properties = async () => {
  let properties: Property[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    properties = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  properties = properties.filter((property) => {
    return property.isPublished == 1;
  });

  return (
    <>
      <Hero
        image="/images/banner.jpg"
        title="Properties"
        description="Explore our dynamic living spaces."
      />

      <Body properties={properties} />
    </>
  );
};

export default Properties;
