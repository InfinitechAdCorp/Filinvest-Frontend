"use client";

import React from "react";
import { Button, Link } from "@heroui/react";
import { LuArrowRight, LuPhone } from "react-icons/lu";

const Hero = () => {
  return (
    <section
      className="relative flex h-auto w-full flex-col items-center justify-center px-4 py-32"
      style={{ backgroundImage: 'url("/images/hero.jpg")' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-800 opacity-60"></div>

      <div className="flex items-center justify-center">
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center space-y-6 text-center">
          <h3 className="text-3xl font-bold uppercase leading-tight text-white sm:text-6xl">
            Find Your Dream Property Today
          </h3>
          <p className="w-full max-w-4xl text-lg text-white lg:text-xl">
            Unlock the door to your dream home with the best listings at your
            fingertips. Explore a variety of properties, compare top features,
            and make informed decisions—all in one seamless experience.
          </p>

          <div className="mt-6 flex w-full justify-between gap-4 sm:w-auto sm:flex-row">
            <Button
              as={Link}
              size="lg"
              variant="solid"
              color="secondary"
              href="/properties"
              endContent={<LuArrowRight size={18} />}
            >
              Explore More
            </Button>

            <Button
              as={Link}
              size="lg"
              variant="bordered"
              className="text-white"
              href="/contact-us"
              endContent={<LuPhone size={18} />}
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
