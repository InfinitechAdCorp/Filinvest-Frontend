"use client";

import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";
import Icons from './icons';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
      <div className="hidden lg:block">
        <Icons />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
