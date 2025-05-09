"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Sidebar from "../admin/layout/sidebar";
import Footer from "../user/layout/footer";
import Icons from "../user/layout/icons";
import NavBar from "../user/layout/navbar";

type Props = {
  isLoggedIn: boolean;
  children: React.ReactNode;
  excludeFooter?: boolean; // still kept in case you want to manually override
};

const Layout = ({ isLoggedIn, children, excludeFooter }: Props) => {
  const pathname = usePathname();
  const path = pathname.startsWith("/admin") ? "Admin" : "User";
  const isRoomPlannerPage = pathname.includes("/roomplanner");

  return (
    <>
      {path === "Admin" ? (
        <>
          {isLoggedIn && pathname !== "/admin" ? (
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
          <div className="min-h-screen">
            {!isRoomPlannerPage && <NavBar />}
            {children}
            {!isRoomPlannerPage && !excludeFooter && <Icons />}
            {!isRoomPlannerPage && !excludeFooter && <Footer />}
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
