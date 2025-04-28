import { Destroy } from "@/types/globals";
import axios from "axios";

export const upsert = async (
  url: string,
  model: string,
  action: "Create" | "Update",
  values: any
) => {
  values = action == "Create" ? values : { ...values, _method: "PUT" };
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, values, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}/${values.id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return { code: 200, message: `Deleted ${model}` };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Something Went Wrong", error: error };
  }
};
