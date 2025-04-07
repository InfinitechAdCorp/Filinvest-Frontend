import React from "react";
import { displayFormat } from "@/actions/admin/testimonials";
import { Testimonial as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/testimonials/renderBody";

const Testimonials = async () => {
  const model = "Testimonials";

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "message", name: "MESSAGE", sortable: true },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    ufRecords = response.data.records;
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  const records = await displayFormat(columns, ufRecords);

  return (
    <div className="w-full flex justify-center">
      <DataTable
        model={model}
        columns={columns}
        records={records}
        RenderBody={RenderBody}
      />
    </div>
  );
};

export default Testimonials;
