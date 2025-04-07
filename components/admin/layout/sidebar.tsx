"use client";

import React from "react";
import { Card, Divider, Image } from "@heroui/react";
import { useRouter, usePathname } from "next/navigation";
import {
  HiChatBubbleLeftRight,
  HiChartBar,
  HiBuildingOffice2,
  HiTrophy,
  HiNewspaper,
  HiBriefcase,
  HiCalendarDays,
  HiQuestionMarkCircle,
  HiMagnifyingGlass,
  HiDocument,
} from "react-icons/hi2";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname.startsWith(url) ? "bg-blue-400" : "";
  };
  
  return (
    <div>
      <Card
        radius="none"
        shadow="md"
        className="w-64 min-h-screen border-none h-screen bg-primary
               flex flex-col overflow-y-auto fixed top-0 left-0 z-40
               transition-transform transform 
               lg:relative lg:z-auto lg:h-auto"
      >
        <div className="flex items-center justify-center mb-3">
          <div className="flex flex-col items-center text-center mt-10 font-thin text-primary">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="mb-2 w-full h-[5rem]"
            />
          </div>
        </div>
        <nav className="flex-1 p-4 text-start items-center">
          <ul className="space-y-4">
            <h1 className="text-white">Main</h1>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/dashboard"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/dashboard")}
            >
              <HiChartBar className="h-5 w-5 text-white" />
              <h3> Dashboard</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/properties"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/properties")}
            >
              <HiBuildingOffice2 className="h-5 w-5 text-white" />
              <h3>Properties</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/appointments"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/appointments")}
            >
              <HiCalendarDays className="h-5 w-5 text-white" />
              <h3>Appointments</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/inquiry"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/inquiries")}
            >
              <HiMagnifyingGlass className="h-5 w-5 text-white" />
              <h3>Inquiries</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/careers"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/careers")}
            >
              <HiBriefcase className="h-5 w-5 text-white" />
              <h3>Careers</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/applications"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/applications")}
            >
              <HiDocument className="h-5 w-5 text-white" />
              <h3>Applications</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/testimonials"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/testimonials")}
            >
              <HiChatBubbleLeftRight className="h-5 w-5 text-white" />
              <h3>Testimonials</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/faqs"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/faqs")}
            >
              <HiQuestionMarkCircle className="h-5 w-5 text-white" />
              <h3>FAQs</h3>
            </li>
            <Divider orientation="horizontal" />
            <h1 className="text-white">Articles</h1>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/awards"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/articles/awards")}
            >
              <HiTrophy className="h-5 w-5 text-white" />
              <h3>Awards</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/news"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/articles/news")}
            >
              <HiNewspaper className="h-5 w-5 text-white" />
              <h3>News</h3>
            </li>
            <li
              className={`p-2 flex items-center space-x-2 hover:bg-blue-300 rounded-md ${isActive(
                "/admin/blogs"
              )} text-white cursor-pointer`}
              onClick={() => router.push("/admin/articles/blogs")}
            >
              <HiChatBubbleLeftRight className="h-5 w-5 text-white" />
              <h3>Blogs</h3>
            </li>
          </ul>
        </nav>
      </Card>
    </div>
  );
};

export default Sidebar;
