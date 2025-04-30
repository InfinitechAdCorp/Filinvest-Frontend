"use client";

import React from "react";
import { Button } from "@heroui/react";
import { logout } from "@/utils/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const router = useRouter();

  const onPress = async () => {
    const { message } = await logout();
    toast.success(message);
    router.push("/admin");
  };

  return (
    <Button className="px-10 py-4" color="danger" onPress={onPress}>
      Logout
    </Button>
  );
};

export default LogoutButton;
