import React from "react";
import {
  LuBuilding2,
  LuCalendarRange,
  LuMailQuestion,
  LuUsers,
} from "react-icons/lu";
import { Counts } from "@/types/admin";
import axios from "axios";
import toast from "react-hot-toast";
import Body from "@/components/admin/dashboard/body";

const Page = async () => {
  let counts: Counts = {
    properties: 0,
    appointments: 0,
    inquiries: 0,
    subscribers: 0,
  };

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-counts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    counts = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  let charts = {
    appointments: [],
    inquiries: [],
  };

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/get-charts`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    charts = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  const cards = [
    {
      url: "/admin/properties",
      model: "Properties",
      count: counts.properties,
      color: "green",
      Icon: <LuBuilding2 size={56} />,
    },
    {
      url: "/admin/appointments",
      model: "Appointments",
      count: counts.appointments,
      color: "yellow",
      Icon: <LuCalendarRange size={56} />,
    },
    {
      url: "/admin/inquiries",
      model: "Inquiries",
      count: counts.inquiries,
      color: "blue",
      Icon: <LuMailQuestion size={56} />,
    },
    {
      url: "/admin/subscribers",
      model: "Subscribers",
      count: counts.subscribers,
      color: "pink",
      Icon: <LuUsers size={56} />,
    },
  ];

  return (
    <div className="flex w-full justify-center">
      <Body cards={cards} charts={charts} />
    </div>
  );
};

export default Page;
