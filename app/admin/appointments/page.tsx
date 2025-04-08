import React from "react";
import { displayFormat } from "@/actions/admin/appointments";
import { Appointment as Record } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import RenderBody from "@/components/admin/appointments/renderBody";

const Page = async () => {
  const model = "FAQs";

  const columns = [
    { key: "property", name: "PROPERTY", sortable: true },
    { key: "first_name", name: "FIRST NAME", sortable: true },
    { key: "last_name", name: "LAST NAME", sortable: true },
    { key: "mobile", name: "MOBILE", sortable: true },
    { key: "email", name: "EMAIL", sortable: true },
    { key: "date", name: "DATE", sortable: true },
    { key: "time", name: "TIME", sortable: true },
    { key: "message", name: "MESSAGE", sortable: true },
    { key: "status", name: "STATUS", sortable: true },
    { key: "actions", name: "ACTIONS", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/appointments`,
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
