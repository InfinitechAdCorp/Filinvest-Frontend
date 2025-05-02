"use client";

import { Code } from "@/types/globals";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  code: number;
};

const Body = ({ code }: Props) => {
  const router = useRouter();

  const messages = {
    200: "Unsubscribed Successfully",
    404: "Email Not Found",
    500: "Something Went Wrong",
  };

  const message = messages[code as Code];

  useEffect(() => {
    if (code == 200) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }, []);

  return <div className="py-[20rem]"></div>;
};

export default Body;
