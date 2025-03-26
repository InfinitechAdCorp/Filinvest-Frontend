import Hero from "@/components/globals/hero";
import InquiryForm from "@/components/user/contact-us/inquiryForm";
import Details from "@/components/user/contact-us/details";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <Hero
        image="/images/banner.jpg"
        title="Contact Us"
        description="Get in touch with us for inquiries, partnerships, or assistance. We're here to help!"
      />

      <div className="flex justify-center mx-60 my-7">
        <div className="grid lg:grid-cols-2 gap-10">
          <InquiryForm />
          <Details />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
