import { Destroy } from "@/types/globals";
import axios from "axios";

export const upsert = async (
  url: string,
  model: string,
  action: "Create" | "Update",
  values: any
) => {
  values = action == "Create" ? values : { ...values, _method: "PUT" };
  console.log(values);
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });
    return { code: 200, message: `${action}d ${model}` };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Something went wrong!", error: error };
  }
};

export const destroy = async (url: string, model: string, values: Destroy) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/${url}/${values.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return { code: 200, message: `Deleted ${model}` };
  } catch (error) {
    console.error(error);
    return { code: 500, message: "Something went wrong!", error: error };
  }
};
