"use client";

import React from "react";
import NavBar from "../user/layout/navbar";
import Icons from "../user/layout/icons";
import Footer from "../user/layout/footer";
import { usePathname } from "next/navigation";
import Sidebar from "../admin/layout/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const role = pathname.startsWith("/admin") ? "Admin" : "User";

  return (
    <>
      {role == "Admin" ? (
        <>
          <div className="flex justify-between">
            <Sidebar />
            {children}
          </div>
        </>
      ) : (
        <>
          <NavBar />
          {children}
          <Icons />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
