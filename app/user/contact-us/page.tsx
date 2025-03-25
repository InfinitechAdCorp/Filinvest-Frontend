import Hero from "@/components/globals/hero";
import Details from "@/components/user/contact-us/details";
import SideContent from "@/components/user/contact-us/details";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <Hero
        image="/images/banner.jpg"
        title="Contact Us"
        description="Get in touch with us for inquiries, partnerships, or assistance. We're here to help!"
      />

      <div className="flex justify-center">
        <div className="flex justify-between">
          <div>
            
          </div>
          <Details />
        </div>
      </div>
    </>
  );
};

export default ContactUs;
