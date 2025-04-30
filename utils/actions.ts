import axios from "axios";
import { Destroy } from "@/types/globals";
import { get as getCookies } from "@/utils/auth";

export const upsert = async (
  url: string,
  model: string,
  action: "Create" | "Update",
  values: any,
) => {
  const { record: cookies } = await getCookies();
  values = action == "Create" ? values : { ...values, _method: "PUT" };

  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, values, {
      headers: {
        Authorization: `Bearer ${cookies.apiToken}`,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    return { code: 200, message: `${action}d ${model}` };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Something Went Wrong", error: error };
  }
};

export const destroy = async (url: string, model: string, values: Destroy) => {
  const { record: cookies } = await getCookies();

  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}/${values.id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.apiToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return { code: 200, message: `Deleted ${model}` };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Something Went Wrong", error: error };
  }
};
