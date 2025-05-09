"use client";

import { useState } from "react";
import { Card, Divider, Image } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import {
  HiBuildingOffice2,
  HiCalendarDays,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiMagnifyingGlass,
  HiBars3,
  HiNewspaper,
  HiQuestionMarkCircle,
  HiTrophy,
  HiUsers,
  HiXMark,
} from "react-icons/hi2";
import LogoutButton from "../auth/logoutButton";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname.startsWith(url) ? "bg-blue-400" : "";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 block lg:hidden text-white bg-blue-600 p-2 rounded-md"
      >
{isOpen ? <HiXMark className="w-6 h-6" /> : <HiBars3 className="w-6 h-6" />}

      </button>

      {/* Sidebar */}
      <Card
        radius="none"
        shadow="md"
        className={`fixed top-0 left-0 z-40 flex h-screen w-64 flex-col overflow-y-auto bg-primary transition-transform duration-300 lg:relative lg:z-auto lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-3 flex items-center justify-center">
          <div className="mt-10 flex flex-col items-center text-center font-thin text-primary">
            <Image
              src="/images/logo.png"
              alt="Logo"
              className="mb-2 h-[5rem] w-full"
            />
          </div>
        </div>

        <nav className="flex-1 items-center p-4 text-start">
          <ul className="space-y-4">
            <h1 className="text-white">Main</h1>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/dashboard"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/dashboard")}
            >
              <HiChartBar className="h-5 w-5 text-white" />
              <h3> Dashboard</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/properties"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/properties")}
            >
              <HiBuildingOffice2 className="h-5 w-5 text-white" />
              <h3>Properties</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/appointments"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/appointments")}
            >
              <HiCalendarDays className="h-5 w-5 text-white" />
              <h3>Appointments</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/inquiries"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/inquiries")}
            >
              <HiMagnifyingGlass className="h-5 w-5 text-white" />
              <h3>Inquiries</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/testimonials"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/testimonials")}
            >
              <HiChatBubbleLeftRight className="h-5 w-5 text-white" />
              <h3>Testimonials</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/subscribers"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/subscribers")}
            >
              <HiUsers className="h-5 w-5 text-white" />
              <h3>Subscribers</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/faqs"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/faqs")}
            >
              <HiQuestionMarkCircle className="h-5 w-5 text-white" />
              <h3>FAQs</h3>
            </li>

            <Divider orientation="horizontal" className="bg-white" />

            <h1 className="text-white">Articles</h1>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/articles/awards"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/articles/awards")}
            >
              <HiTrophy className="h-5 w-5 text-white" />
              <h3>Awards</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/articles/news"
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/articles/news")}
            >
              <HiNewspaper className="h-5 w-5 text-white" />
              <h3>News</h3>
            </li>
          </ul>
        </nav>

        <div className="flex items-center justify-center py-8">
          <LogoutButton />
        </div>
      </Card>
    </>
  );
};

export default Sidebar;
