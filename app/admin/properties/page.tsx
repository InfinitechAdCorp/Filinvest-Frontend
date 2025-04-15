import React from "react";
import { displayFormat } from "@/actions/admin/properties";
import { Property as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/properties/renderBody";

const Page = async () => {
  const model = "FAQs";

  const columns = [
    { name: "name", sortable: true },
    { name: "logo", sortable: true },
    { name: "type", sortable: true },
    { name: "price", sortable: true },
    { name: "location", sortable: true },
    { name: "area", sortable: true },
    { name: "status", sortable: true },
    { name: "substatus", sortable: true },
    { name: "description", sortable: true },
    { name: "amenities", sortable: true },
    { name: "actions", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties`,
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

export default Page;
