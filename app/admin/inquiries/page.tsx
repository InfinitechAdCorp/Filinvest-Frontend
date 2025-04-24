import React from "react";
import { displayFormat } from "@/actions/admin/inquiries";
import { Property, Inquiry as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/inquiries/renderBody";
import CreateForm from "@/components/admin/inquiries/createForm";
import { sortRecords } from "@/utils/formatters";

const Page = async () => {
  let properties: Property[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    properties = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  properties = properties.filter((property) => {
    return property.isPublished == 1;
  });
  properties = sortRecords(properties, "name");

  const url = "inquiries";
  const model = "Inquiry";

  const columns = [
    { name: "first_name", sortable: true },
    { name: "last_name", sortable: true },
    { name: "mobile", sortable: true },
    { name: "email", sortable: true },
    { name: "property", sortable: true },
    { name: "message", sortable: true },
    { name: "actions", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      {
        headers: {
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
