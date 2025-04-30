"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { Login } from "@/types/admin";

export const get = async () => {
  const session = await cookies();

  const record = {
    isLoggedIn: session.get("isLoggedIn")?.value == "true",
    apiToken: session.get("apiToken")?.value,
  };

  return { code: 200, message: "Fetched Cookies", record: record };
};

export const login = async (values: Login) => {
  let code = 401;
  let message = "";
  let apiToken = "";

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      values,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    code = response.status;
    apiToken = response.data.token;
  } catch (error: any) {
    console.error(error);
    code = error.status;
  }

  if (code == 200) {
    message = "Logged In";
  } else if (code == 401) {
    message = "Invalid Credentials";
  } else {
    message = "Something Went Wrong";
  }

  const isLoggedIn = code == 200 ? true : false;

  if (code == 200) {
    const session = await cookies();
    session.set("isLoggedIn", `${isLoggedIn}`);
    session.set("apiToken", apiToken);
  }

  return { code: code, message: message };
};

export const logout = async () => {
  const session = await cookies();

  ["isLoggedIn", "apiToken"].forEach((key) => {
    session.delete(key);
  });

  return { code: 200, message: "Logged Out" };
};
