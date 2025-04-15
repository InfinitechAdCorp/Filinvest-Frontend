"use server";

import { revalidatePath } from "next/cache";

export const revalidate = async (url: string, code: number) => {
  if (code == 200) {
    revalidatePath(`/admin/${url}`);
  }
};
