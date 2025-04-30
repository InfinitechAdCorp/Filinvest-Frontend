"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import React from "react";

export interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const router = useRouter();

  return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>;
}
