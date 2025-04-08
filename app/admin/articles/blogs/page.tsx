import React from "react";
import { displayFormat } from "@/actions/admin/articles";
import { Article as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/articles/awards/renderBody";

const Page = async () => {
  const model = "Blogs";

  const columns = [
    { key: "name", name: "NAME", sortable: true },
    { key: "date", name: "DATE", sortable: true },
    { key: "description", name: "DESCRIPTION", sortable: true },
    { key: "image", name: "IMAGE", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/articles`,
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

  const fRecords = ufRecords.filter((ufRecord) => {
    return ufRecord.type == "Award";
  });

  const records = await displayFormat(columns, fRecords);

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
