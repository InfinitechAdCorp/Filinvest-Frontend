import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Link,
  Image,
} from "@heroui/react";
import {
  LuCalculator,
  LuCalendar,
  LuChevronDown,
  LuLayoutGrid,
} from "react-icons/lu";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  return (
    <Navbar
      maxWidth="2xl"
      isBordered
      isBlurred={false}
      className="bg-primary text-white p-0"
    >
      <>
        <NavbarBrand>
          <Image src="/images/logo.png" alt="Logo" className="w-52" />
        </NavbarBrand>

        <NavbarContent
          className="hidden lg:flex gap-4 text-white cursor-pointer"
          justify="center"
        >
          <NavbarItem>
            <Button variant="light">
              <Link href="/" className="text-white">
                Home
              </Link>
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button variant="light">
              <Link href="/about-us" className="text-white">
                About Us
              </Link>
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  endContent={
                    <LuChevronDown className="text-white" size={18} />
                  }
                >
                  <Link href="/" className="text-white">
                    Our Project
                  </Link>
                </Button>
              </DropdownTrigger>

              <DropdownMenu className="w-40 dark:text-white rounded-md">
                <DropdownItem key="Residential">Residential</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  endContent={
                    <LuChevronDown className="text-white" size={18} />
                  }
                >
                  <Link href="/" className="text-white">
                    Forms and Utiilities
                  </Link>
                </Button>
              </DropdownTrigger>

              <DropdownMenu className="dark:text-white rounded-md text-center">
                <DropdownItem
                  startContent={<LuCalendar />}
                  key="appointment"
                  onPress={() => router.push("/appointment")}
                >
                  Set Appointment
                </DropdownItem>
                <DropdownItem
                  startContent={<LuCalculator />}
                  key="loan-calculator"
                  onPress={() => router.push("/loan-calculator")}
                >
                  Loan Calculator
                </DropdownItem>
                <DropdownItem
                  startContent={<LuLayoutGrid />}
                  key="room-planner"
                  onPress={() => router.push("/room-planner")}
                >
                  Room Planner
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Button variant="solid" color="secondary">
              <Link href={"#"} className="text-white">
                Contact Us
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </>

      <>
        <NavbarContent className="lg:hidden flex" justify="end">
          <NavbarMenuToggle className="text-white" />
        </NavbarContent>

        <NavbarMenu className="bg-black bg-opacity-70 backdrop-blur-md">
          <NavbarMenuItem>
            <Link className="w-full text-white" href="/">
              Home
            </Link>
            <Link className="w-full text-white" href="/about-us">
              About Us
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className="cursor-pointer border-t-1">
            <h1 className="text-white font-bold mb-2 mt-2">Our Project</h1>
          </NavbarMenuItem>

          <NavbarMenuItem className="cursor-pointer border-t-1">
            <h1 className="text-white font-bold mb-2 mt-2">
              Forms & Utilities
            </h1>
            <Link className="w-full text-white" href="/appointment">
              Set Appointment
            </Link>
            <Link className="w-full text-white" href="/loan-calculator">
              Loan Calculator
            </Link>
            <Link className="w-full text-white" href="/room-planner">
              Room Planner
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </>
    </Navbar>
  );
};

export default NavBar;
