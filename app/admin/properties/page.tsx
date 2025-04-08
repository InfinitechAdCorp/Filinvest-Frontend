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
    { key: "name", name: "NAME", sortable: true },
    { key: "logo", name: "LOGO", sortable: true },
    { key: "type", name: "TYPE", sortable: true },
    { key: "price", name: "PRICE", sortable: true },
    { key: "location", name: "LOCATION", sortable: true },
    { key: "area", name: "AREA", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "substatus", name: "SUBSTATUS", sortable: true },
    { key: "description", name: "DESCRIPTION", sortable: true },
    { key: "amenities", name: "AMENITIES", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
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
