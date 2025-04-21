import React from "react";
import { displayFormat } from "@/actions/admin/appointments";
import { Property, Appointment as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/appointments/renderBody";
import CreateForm from "@/components/admin/appointments/createForm";
import { sortRecords } from "@/utils/formatters";

const Page = async () => {
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
    properties = sortRecords(properties, "name");
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong!");
  }

  const url = "appointments";
  const model = "Appointment";

  const columns = [
    { name: "first_name", sortable: true },
    { name: "last_name", sortable: true },
    { name: "mobile", sortable: true },
    { name: "email", sortable: true },
    { name: "date", sortable: true },
    { name: "time", sortable: true },
    { name: "property", sortable: true },
    { name: "message", sortable: true },
    { name: "status", sortable: true },
    { name: "actions", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
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

  const Buttons = (
    <CreateForm url={url} model={model} properties={properties} />
  );

  return (
    <div className="w-full flex justify-center">
      <DataTable
        url={url}
        model={model}
        columns={columns}
        records={records}
        RenderBody={RenderBody}
        Buttons={Buttons}
        dependencies={{
          properties: properties,
        }}
      />
    </div>
  );
};

export default Page;
