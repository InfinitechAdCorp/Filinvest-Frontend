"use client";

import { Button, Input, Link } from "@heroui/react";
import React from "react";

const Others = () => {
  return (
    <div className="border-t-1 text-primary py-2">
      <div className="container mx-auto px-2 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-4">
          <div className="lg:border border-gray-200 px-2 py-5 lg:p-10 flex flex-col h-full">
            <h1 className="text-2xl text-primary">
              Newsletter <span className="font-bold">Signup</span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email below to stay updated with Filinvest's new
              developments and offers!
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-2 lg:mt-11">
              <Input
                placeholder="Email Address"
                type="email"
                variant="underlined"
              />
              <Button className="bg-primary text-white">Subscribe</Button>
            </div>
          </div>

          <div className="lg:border border-gray-200 px-2 py-5 lg:p-10 flex flex-col h-full">
            <h1 className="text-2xl text-primary">
              <span className="font-bold">Blogs</span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Discover expert tips and insights for creating a{" "}
              <span className="font-semibold">stylish, functional home</span>.
            </p>
            <div className="mt-2 lg:mt-11">
              <Link href="/articles/blogs">
                <Button className="bg-primary text-white">See More</Button>
              </Link>
            </div>
          </div>

          <div className="lg:border border-gray-200 px-2 py-5 lg:p-10 flex flex-col h-full">
            <h1 className="text-2xl text-primary">
              <span className="font-bold">Careers</span>
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Build your dream with us! Be a part of a diversified and trusted
              team. Work with a dynamic, innovative company!
            </p>
            <div className="mt-2 lg:mt-6">
              <Link href="/careers">
                <Button className="bg-primary text-white">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Others;
