import Hero from "@/components/globals/hero";
import React from "react";
import axios from "axios";
import { Property } from "@/types/globals";
import toast from "react-hot-toast";
import Body from "@/components/user/contact-us/body";
import { sortRecords } from "@/utils/formatters";

const Page = async () => {
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
    properties = sortRecords(properties, "name");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  return (
    <>
      <Hero
        image="/images/banner.jpg"
        title="Contact Us"
        description="Get in touch with us for inquiries, partnerships, or assistance. We're here to help!"
      />

      <div className="flex justify-center mx-72 my-7">
        <Body properties={properties} />
      </div>
    </>
  );
};

export default Page;
