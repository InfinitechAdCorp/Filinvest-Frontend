import React from "react";
import { displayFormat } from "@/actions/admin/testimonials";
import { Testimonial as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/testimonials/renderBody";
import CreateForm from "@/components/admin/testimonials/createForm";

const Page = async () => {
  const url = "testimonials";
  const model = "Testimonial";

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "message", name: "MESSAGE", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
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
