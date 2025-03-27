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
      <div
        className="fixed bottom-6 right-2 p-2 sm:p-4 bg-primary backdrop-blur-md border border-white/30 rounded-l-lg flex 
        flex-col gap-2 sm:gap-3 items-center z-50"
      >
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
            className="border border-white bg-transparent text-white p-2 sm:p-3 rounded-full 
                    shadow-md flex items-center justify-center hover:bg-primary transition-all w-10 h-10 sm:w-12 sm:h-12 text-sm sm:text-base"
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
