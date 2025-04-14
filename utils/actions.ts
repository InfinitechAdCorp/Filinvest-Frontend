"use server";

import { Destroy } from "@/types/globals";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const upsert = async (
  url: string,
  model: string,
  action: "Create" | "Update",
  values: any
) => {
  const body = action == "Create" ? values : { ...values, _method: "PUT" };
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath(`/admin/${url}`);
    return { code: 200, message: `${action}d ${model}` };
  } catch (error) {
    console.error("Error:", error);
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
        },
      }
    );

    revalidatePath(`/admin/${url}`);
    return { code: 200, message: `Deleted ${model}` };
  } catch (error) {
    console.error("Error:", error);
    return { code: 500, message: "Something went wrong!", error: error };
  }
};
