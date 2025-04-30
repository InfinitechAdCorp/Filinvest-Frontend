"use client";

import React from "react";
import NavBar from "../user/layout/navbar";
import Icons from "../user/layout/icons";
import Footer from "../user/layout/footer";
import { usePathname } from "next/navigation";
import Sidebar from "../admin/layout/sidebar";

type Props = {
  isLoggedIn: boolean;
  children: React.ReactNode;
};

const Layout = ({ isLoggedIn, children }: Props) => {
  const pathname = usePathname();
  const path = pathname.startsWith("/admin") ? "Admin" : "User";

  return (
    <>
      {path == "Admin" ? (
        <>
          {isLoggedIn && pathname != "/admin" ? (
            <div className="flex justify-between">
              <Sidebar />
              {children}
            </div>
          ) : (
            <div className="flex h-screen items-center justify-center">
              {children}
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <NavBar />
            {children}
            <Icons />
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
