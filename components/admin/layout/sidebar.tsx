"use client";

import { Card, Divider, Image } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import {
  HiBuildingOffice2,
  HiCalendarDays,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiMagnifyingGlass,
  HiNewspaper,
  HiQuestionMarkCircle,
  HiTrophy,
  HiUsers,
} from "react-icons/hi2";
import LogoutButton from "../auth/logoutButton";

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
        className="fixed left-0 top-0 z-40 flex h-screen min-h-screen w-64 transform flex-col overflow-y-auto border-none bg-primary transition-transform lg:relative lg:z-auto lg:h-auto"
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
                "/admin/dashboard",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/dashboard")}
            >
              <HiChartBar className="h-5 w-5 text-white" />
              <h3> Dashboard</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/properties",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/properties")}
            >
              <HiBuildingOffice2 className="h-5 w-5 text-white" />
              <h3>Properties</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/appointments",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/appointments")}
            >
              <HiCalendarDays className="h-5 w-5 text-white" />
              <h3>Appointments</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/inquiries",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/inquiries")}
            >
              <HiMagnifyingGlass className="h-5 w-5 text-white" />
              <h3>Inquiries</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/testimonials",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/testimonials")}
            >
              <HiChatBubbleLeftRight className="h-5 w-5 text-white" />
              <h3>Testimonials</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/subscribers",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/subscribers")}
            >
              <HiUsers className="h-5 w-5 text-white" />
              <h3>Subscribers</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/faqs",
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
                "/admin/articles/awards",
              )} cursor-pointer text-white`}
              onClick={() => router.push("/admin/articles/awards")}
            >
              <HiTrophy className="h-5 w-5 text-white" />
              <h3>Awards</h3>
            </li>

            <li
              className={`flex items-center space-x-2 rounded-md p-2 hover:bg-blue-300 ${isActive(
                "/admin/articles/news",
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
    </div>
  );
};

export default Sidebar;
