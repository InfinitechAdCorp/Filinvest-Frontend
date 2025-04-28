import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const Icons = () => {
  return (
    <div className="hidden lg:block">
      <div className="fixed bottom-6 right-2 z-50 flex flex-col items-center gap-2 rounded-l-lg border border-white/30 bg-primary p-2 backdrop-blur-md sm:gap-3 sm:p-4">
        {[
          { icon: <FaFacebookF />, link: "https://www.facebook.com/filinvest" },
          {
            icon: <FaInstagram />,
            link: "https://www.instagram.com/filinvest/",
          },
          { icon: <FaTwitter />, link: "https://x.com/filinvest" },
          {
            icon: <FaLinkedinIn />,
            link: "https://www.linkedin.com/company/filinvest/",
          },
          { icon: <FaYoutube />, link: "https://www.youtube.com/filinvest" },
        ].map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white bg-transparent p-2 text-sm text-white shadow-md transition-all hover:bg-primary sm:h-12 sm:w-12 sm:p-3 sm:text-base"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Icons;
