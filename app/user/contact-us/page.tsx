import Hero from "@/components/globals/hero";
import InquiryForm from "@/components/user/contact-us/inquiryForm";
import Details from "@/components/user/contact-us/details";
import React from "react";
import axios from "axios";
import { Property } from "@/types/user";
import toast from "react-hot-toast";

const ContactUs = async () => {
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

  return (
    <>
      <Hero
        image="/images/banner.jpg"
        title="Contact Us"
        description="Get in touch with us for inquiries, partnerships, or assistance. We're here to help!"
      />

      <div className="flex justify-center mx-72 my-7">
        <div className="flex justify-between gap-10">
          <InquiryForm properties={properties} />
          <Details />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
