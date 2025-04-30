import { displayFormat } from "@/actions/admin/subscribers";
import CreateForm from "@/components/admin/subscribers/createForm";
import RenderBody from "@/components/admin/subscribers/renderBody";
import DataTable from "@/components/globals/datatable/dataTable";
import { Subscriber as Record } from "@/types/globals";
import { get as getCookies } from "@/utils/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Page = async () => {
  const { record: cookies } = await getCookies();

  const url = "subscribers";
  const model = "Subscriber";

  const columns = [
    { name: "email", sortable: true },
    { name: "actions", sortable: false },
  ];

  let ufRecords: Record[] = [];
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.apiToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    ufRecords = response.data.records;
  } catch (error) {
    console.error(error);
    toast.error("Something Went Wrong");
  }

  const records = await displayFormat(columns, ufRecords);

  const Buttons = <CreateForm url={url} model={model} />;

  return (
    <div className="flex w-full justify-center">
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
