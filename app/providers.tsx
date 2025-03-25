"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";

export interface Props {
  children: React.ReactNode;
}

export function Providers({ children }: Props) {
  const router = useRouter();

  return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>;
}
