import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
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
      className="bg-primary p-0 text-white"
    >
      <>
        <NavbarBrand as={Link} href="/">
          <Image src="/images/logo.png" alt="Logo" className="w-52" />
        </NavbarBrand>

        <NavbarContent
          className="hidden cursor-pointer gap-4 text-white lg:flex"
          justify="center"
        >
          <NavbarItem>
            <Button as={Link} variant="light" href="/">
              <h3 className="text-[1rem] text-white">Home</h3>
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button as={Link} variant="light" href="/about-us">
              <h3 className="text-[1rem] text-white">About Us</h3>
            </Button>
          </NavbarItem>

          <NavbarItem>
            <Button as={Link} variant="light" href="/properties">
              <h3 className="text-[1rem] text-white">Properties</h3>
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
                  <h3 className="text-medium text-white">
                    Forms and Utiilities
                  </h3>
                </Button>
              </DropdownTrigger>

              <DropdownMenu className="rounded-md dark:text-white">
                <DropdownItem
                  key="Set Appointment"
                  as={Link}
                  href="/set-appointment"
                  startContent={<LuCalendar />}
                >
                  Set Appointment
                </DropdownItem>
                <DropdownItem
                  key="Loan Calculator"
                  as={Link}
                  href="/loan-calculator"
                  startContent={<LuCalculator />}
                >
                  Loan Calculator
                </DropdownItem>
                <DropdownItem
                  key="Room Planner"
                  as={Link}
                  href="/room-planner"
                  startContent={<LuLayoutGrid />}
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
              <Link href="/contact-us" className="text-white">
                Contact Us
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </>

      <>
        <NavbarContent className="flex lg:hidden" justify="end">
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
            <Link className="w-full text-white" href="/contact-us">
              Contact Us
            </Link>
            <Link className="w-full text-white" href="/properties">
              Properties
            </Link>
          </NavbarMenuItem>

          <NavbarMenuItem className="cursor-pointer border-t-1">
            <h3 className="mb-2 mt-2 font-bold text-white">
              Forms & Utilities
            </h3>
            <Link className="w-full text-white" href="/set-appointment">
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
