"use client";

import React from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const router = useRouter();

  const onPress = async () => {
    toast.success("Logged Out");
    router.push("/admin");
  };

  return (
    <Button className="px-10 py-4 bg-blue-400 text-white" onPress={onPress}>
      Logout
    </Button>
  );
};

export default LogoutButton;
