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
import CountCard from "@/components/admin/dashboard/countCard";

const Page = async () => {
  let records: Counts = {
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
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    records = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  const cards = [
    {
      model: "Properties",
      count: records.properties,
      color: "green",
      Icon: <LuBuilding2 size={56} />,
    },
    {
      model: "Appointments",
      count: records.appointments,
      color: "yellow",
      Icon: <LuCalendarRange size={56} />,
    },
    {
      model: "Inquiries",
      count: records.inquiries,
      color: "blue",
      Icon: <LuMailQuestion size={56} />,
    },
    {
      model: "Subscribers",
      count: records.subscribers,
      color: "pink",
      Icon: <LuUsers size={56} />,
    },
  ];

  return (
    <div className="w-full flex justify-center space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <CountCard
            key={card.model}
            model={card.model}
            count={card.count}
            color={card.color}
            Icon={card.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
