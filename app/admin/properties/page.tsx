import React from "react";
import { displayFormat } from "@/actions/admin/properties";
import { Property as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/properties/renderBody";
import CreateForm from "@/components/admin/properties/create/createForm";

const Page = async () => {
  const url = "properties";
  const model = "Property";

  const columns = [
    { name: "logo", sortable: true },
    { name: "name", sortable: true },
    { name: "type", sortable: true },
    { name: "price", sortable: true },
    { name: "location", sortable: true },
    { name: "area", sortable: true },
    { name: "status", sortable: true },
    { name: "description", sortable: true },
    { name: "actions", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    ufRecords = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  const records = await displayFormat(columns, ufRecords);

  const Buttons = <CreateForm url={url} model={model} />;

  return (
    <div className="w-full flex justify-center">
      <DataTable
        url={url}
        model={model}
        columns={columns}
        records={records}
        RenderBody={RenderBody}
        Buttons={Buttons}
      />
    </div>
  );
};

export default Page;
