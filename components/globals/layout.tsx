"use client";

import React from "react";
import NavBar from "../user/layout/navbar";
import Icons from "../user/layout/icons";
import Footer from "../user/layout/footer";
import { usePathname } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const role = pathname.startsWith("/admin") ? "Admin" : "User";

  return (
    <>
      {role == "User" ? (
        <>
          <NavBar />
          {children}
          <div className="hidden lg:block">
            <Icons />
          </div>
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Layout;
