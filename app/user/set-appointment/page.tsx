import React from "react";
import AppointmentForm from "@/components/user/set-appointment/appointmentForm";
import Details from "@/components/user/set-appointment/details";
import { Property } from "@/types/user";
import axios from "axios";
import toast from "react-hot-toast";
import Hero from "@/components/globals/hero";
import Body from "@/components/user/set-appointment/body";

const SetAppointment = async () => {
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
      <Hero image="/images/banner.jpg" title="Set Appointment" />

      <div className="flex justify-center w-full my-7">
        <Body properties={properties} />
      </div>
    </>
  );
};

export default SetAppointment;
