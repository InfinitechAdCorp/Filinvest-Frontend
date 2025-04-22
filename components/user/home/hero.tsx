"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { LuArrowRight, LuPhone } from "react-icons/lu";

const Hero = () => {
  return (
    <section
      className="relative w-full h-auto flex flex-col justify-center items-center px-4 py-32"
      style={{ backgroundImage: 'url("/images/hero.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-60"></div>

      <div className="flex justify-center items-center ">
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-7xl space-y-6">
          <h3 className="text-3xl sm:text-6xl font-bold leading-tight text-white uppercase">
            Find Your Dream Property Today
          </h3>
          <p className="text-lg lg:text-xl text-white w-full max-w-4xl">
            Unlock the door to your dream home with the best listings at your
            fingertips. Explore a variety of properties, compare top features,
            and make informed decisions—all in one seamless experience.
          </p>

          <div className="mt-6 flex justify-between sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              endContent={<LuArrowRight size={18} />}
              size="lg"
              variant="solid"
              color="secondary"
              as={Link}
              href="/properties"
            >
              Explore More
            </Button>

            <Button
              size="lg"
              endContent={<LuPhone size={18} />}
              variant="bordered"
              className="text-white"
              as={Link}
              href="/contact-us"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
