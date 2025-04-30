"use server";

import { cookies } from "next/headers";

export const get = async () => {
  const session = await cookies();

  let record;
  if (session) {
    record = {
      isLoggedIn: session.get("isLoggedIn")?.value === "true",
    };
  }

  return { code: 200, message: "Fetched Cookies", record: record };
};
