import React from "react";
import { displayFormat } from "@/actions/admin/articles";
import { Article as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/articles/renderBody";
import CreateForm from "@/components/admin/articles/createForm";

const Page = async () => {
  const url = "articles";
  const model = "Award";

  const columns = [
    { name: "name", sortable: true },
    { name: "date", sortable: true },
    { name: "description", sortable: true },
    { name: "image", sortable: true },
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
    console.error("Error:", error);
    toast.error("Something Went Wrong");
  }

  const fRecords = ufRecords.filter((ufRecord) => {
    return ufRecord.type == "Award";
  });
  
  const records = await displayFormat(columns, fRecords);

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
