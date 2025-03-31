import SectionTitle from "@/components/globals/sectionTitle";
import AppointmentForm from "@/components/user/set-appointment/appointmentForm";
import Details from "@/components/user/set-appointment/details";
import { Property } from "@/types/user";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

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
      <div className="my-5 space-y-7">
        <SectionTitle title="Set Appointment" />

        <div className="flex justify-center w-full">
          <div className="flex justify-between gap-10">
            <Details />

            <AppointmentForm properties={properties} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SetAppointment;
