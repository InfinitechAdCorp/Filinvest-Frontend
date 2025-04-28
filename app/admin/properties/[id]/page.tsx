import React from "react";
import { Property } from "@/types/globals";
import axios from "axios";
import toast from "react-hot-toast";
import DataTable from "@/components/globals/datatable/dataTable";
import { displayFormat } from "@/actions/admin/offerings";
import RenderBody from "@/components/admin/offerings/renderBody";
import CreateForm from "@/components/admin/offerings/createForm";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const url = "offerings";
  const model = "Offering";

  const columns = [
    { name: "property", sortable: true },
    { name: "type", sortable: true },
    { name: "area", sortable: true },
    { name: "image", sortable: false },
    { name: "actions", sortable: false },
  ];

  const id = (await params).id;

  let property: Property | null = null;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    property = response.data.record;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  const records = await displayFormat(columns, property?.offerings || []);
  const Buttons = (
    <>
      <CreateForm url={url} model={model} property={property as Property} />
    </>
  );
  return (
    <div className="flex w-full justify-center">
      <DataTable
        url={url}
        model={model}
        prefix={`${property!.name}`}
        columns={columns}
        records={records}
        RenderBody={RenderBody}
        Buttons={Buttons}
      />
    </div>
  );
};

export default Page;
