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

const NavBar = () => {
  return (
    <Navbar
      maxWidth="2xl"
      isBordered
      isBlurred={false}
      className="bg-primary text-white p-0"
    >
      <>
        <NavbarBrand as={Link} href="/">
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
              <Link href="/user/about-us" className="text-white">
                About Us
              </Link>
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button variant="light">
              <Link href="/user/properties" className="text-white">
                Properties
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
                  <h3 className="text-white text-medium">
                    Forms and Utiilities
                  </h3>
                </Button>
              </DropdownTrigger>

              <DropdownMenu className="dark:text-white rounded-md text-center">
                <DropdownItem
                  startContent={<LuCalendar />}
                  key="Set Appointment"
                  as={Link}
                  href="/user/set-appointment"
                >
                  Set Appointment
                </DropdownItem>
                <DropdownItem
                  startContent={<LuCalculator />}
                  key="Loan Calculator"
                  as={Link}
                  href="/user/loan-calculator"
                >
                  Loan Calculator
                </DropdownItem>
                <DropdownItem
                  startContent={<LuLayoutGrid />}
                  key="Room Planner"
                  as={Link}
                  href="/user/room-planner"
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
              <Link href="/user/contact-us" className="text-white">
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
            <Link className="w-full text-white" href="/user/about-us">
              About Us
            </Link>
            <Link className="w-full text-white" href="/user/contact-us">
              Contact Us
            </Link>
            <Link className="w-full text-white" href="/user/properties">
              Properties
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className="cursor-pointer border-t-1">
            <h3 className="text-white font-bold mb-2 mt-2">
              Forms & Utilities
            </h3>
            <Link className="w-full text-white" href="/user/set-appointment">
              Set Appointment
            </Link>
            <Link className="w-full text-white" href="/user/loan-calculator">
              Loan Calculator
            </Link>
            <Link className="w-full text-white" href="/user/room-planner">
              Room Planner
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
      </>
    </Navbar>
  );
};

export default NavBar;
