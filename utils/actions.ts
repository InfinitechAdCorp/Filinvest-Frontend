"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const upsert = async (
  model: string,
  url: string,
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
    return { code: 500, message: "Something went wrong!" };
  }
};
