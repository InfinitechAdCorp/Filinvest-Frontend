import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import SubscriberForm from "../home/subscriberForm";
import { Link } from "@heroui/react";

const Footer = () => {
  return (
    <>
      <footer className="border-t-1 py-6 text-primary dark:bg-white dark:text-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Quick Links */}
            <div>
              <h4 className="mb-2 text-lg font-bold">Quick Links</h4>
              <div className="flex gap-8">
                <div className="flex flex-col space-y-1">
                  <Link
                    href="/"
                    className="text-primary hover:text-blue-300 dark:text-black"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about-us"
                    className="text-primary hover:text-blue-300 dark:text-black"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/properties"
                    className="text-primary hover:text-blue-300 dark:text-black"
                  >
                    Properties
                  </Link>
                  <Link
                    href="/contact-us"
                    className="text-primary hover:text-blue-300 dark:text-black"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="flex flex-col space-y-1">
                  <Link
                    href="/set-appointment"
                    className="text-primary hover:text-blue-300 dark:text-black"
                  >
                    Set Appointment
                  </Link>
                  <Link
                    href="/loan-calculator"
                    className="text-primary hover:text-blue-300 dark:text-black"
                  >
                    Loan Calculator
                  </Link>
                  <a
  href="/roomplanner"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary hover:text-blue-300 dark:text-black"
>
  Room Planner
</a>

                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="flex flex-col gap-4">
              <h5 className="text-xl font-semibold">Main Office:</h5>
              <a
                href="https://www.google.com/maps?q=6th+Floor+The+Beaufort+Building,+5th+corner+23rd+Street,+Bonifacio+Global+City,+Taguig,+1632,+Metro+Manila,+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-blue-600 no-underline hover:no-underline"
              >
                6th Floor The Beaufort Building, 5th corner 23rd Street, Bonifacio Global City, Taguig, 1632, Metro Manila, Philippines
              </a>

              <h5 className="text-xl font-semibold">EDSA Office:</h5>
              <a
                href="https://www.google.com/maps?q=Filinvest+Building,+79+EDSA,+Barangay+Highway+Hills,+Mandaluyong,+1550,+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-blue-600 no-underline hover:no-underline"
              >
                Filinvest Building, 79 EDSA, Barangay Highway Hills, Mandaluyong, 1550, Philippines
              </a>
            </div>

            {/* Alabang Office */}
            <div className="flex flex-col gap-4">
              <h5 className="text-xl font-semibold">Alabang Office:</h5>
              <a
                href="https://www.google.com/maps?q=Vector+One+Bldg.+Northgate+Cyberzone,+Filinvest+City,+Alabang,+Muntinlupa+City,+1781,+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-blue-600 no-underline hover:no-underline"
              >
                Vector One Bldg. Northgate Cyberzone, Filinvest City, Alabang, Muntinlupa City, 1781, Philippines
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="flex h-full flex-col">
              <h3 className="text-2xl text-primary">
                Newsletter <span className="font-bold">Signup</span>
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email below to stay updated with Filinvest's new
                developments and offers!
              </p>
              <SubscriberForm />
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="flex w-full flex-col items-center justify-center gap-1 space-y-0 border-t-1 p-4 text-gray-900 dark:bg-white dark:text-black lg:flex-row lg:gap-10">
        <div className="flex flex-col flex-wrap items-center gap-2 text-center sm:flex-row sm:gap-4 sm:text-left">
          <div>Copyright &copy; {new Date().getFullYear()} Filinvest</div>
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/filinvest"
              className="text-gray-900 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare size={20} />
            </a>
            <a
              href="https://x.com/filinvest"
              className="text-gray-900 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/filinvest"
              className="text-gray-900 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.linkedin.com/company/filinvest"
              className="text-gray-900 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.youtube.com/filinvest"
              className="text-gray-900 hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
