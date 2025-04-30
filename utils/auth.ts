"use server";

import { cookies } from "next/headers";
import { Login } from "@/types/admin";
import axios from "axios";

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
  let isValid = false;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      values,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    code = response.status;
  } catch (error) {
    console.error(error);
    code = 500;
  }

  isValid = code == 200 ? true : false;

  if (code == 200) {
    message = "Logged In"
  }
  else if (code == 401) {
    message = "Invalid Credentials"
  }
  else {
    message = "Something Went Wrong"
  }

  const session = await cookies();
  session.set("isLoggedIn", `${isValid}`);

  return { code: code, message: message, isValid: isValid }
};

export const logout = async () => {
  const session = await cookies();

  ["isLoggedIn", "apiToken"].forEach((key) => {
    session.delete(key);
  });

  return { code: 200, message: "Logged Out" };
};
