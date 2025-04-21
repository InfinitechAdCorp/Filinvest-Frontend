import React from "react";
import { Link, Image } from "@heroui/react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="border-t-1 text-primary dark:bg-white dark:text-black py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex justify-center items-center">
              <Image src="/images/seal.png" alt="Seal" className="h-52" />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2">Quick Links</h4>
              <div className="flex gap-10">
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about-us"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/properties"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Properties
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="flex flex-col space-y-1">
                  <Link
                    href="/careers"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Careers
                  </Link>
                  <Link
                    href="/set-appointment"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Set Appointment
                  </Link>
                  <Link
                    href="/loan-calculator"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Loan Calculator
                  </Link>
                  <Link
                    href="/room-planner"
                    className="text-primary dark:text-black hover:text-blue-300"
                  >
                    Room Planner
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h5 className="text-xl font-semibold">Main Office:</h5>
              <p className="text-sm">
                6th Floor The Beaufort Building, 5th corner 23rd Street,
                Bonifacio Global City, Taguig, 1632, Metro Manila, Philippines
              </p>
              <h5 className="text-xl font-semibold">EDSA Office:</h5>
              <p className="text-sm">
                Filinvest Building , 79 EDSA, Barangay Highway Hills,
                Mandaluyong, 1550, Philippines
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h5 className="text-xl font-semibold">Alabang Office:</h5>
              <p className="text-sm">
                Vector One Bldg. Northgate Cyberzone, Filinvest City, Alabang,
                Muntinlupa City, 1781, Philippines
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex flex-col lg:flex-row justify-center gap-1 lg:gap-10 items-center border-t-1 text-gray-900 dark:bg-white dark:text-black w-full p-4 space-y-0">
        <div className="flex flex-col sm:flex-row items-center flex-wrap text-center sm:text-left gap-2 sm:gap-4">
          <div>Copyright &copy; {new Date().getFullYear()} Filinvest </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            <Link
              href="https://www.facebook.com/filinvest"
              className="text-gray-900  hover:text-primary"
              target="_blank"
            >
              <FaFacebookSquare size={20} />
            </Link>
            <Link
              href="https://x.com/filinvest"
              className="text-gray-900  hover:text-primary"
              target="_blank"
            >
              <FaTwitter size={20} />
            </Link>
            <Link
              href="https://www.instagram.com/filinvest"
              className="text-gray-900  hover:text-primary"
              target="_blank"
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              href="https://www.linkedin.com/company/filinvest"
              className="text-gray-900  hover:text-primary"
              target="_blank"
            >
              <FaLinkedin size={20} />
            </Link>
            <Link
              href="https://www.youtube.com/filinvest"
              className="text-gray-900  hover:text-primary"
              target="_blank"
            >
              <FaYoutube size={20} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
