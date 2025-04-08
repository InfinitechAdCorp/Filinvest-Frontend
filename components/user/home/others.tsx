"use client";

import { Button, Link } from "@heroui/react";
import React from "react";
import SubscriberForm from "./subscriberForm";

const Others = () => {
  return (
    <div className="border-t-1 text-primary py-2">
      <div className="container mx-auto px-2 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 mx-64">
          <div className="lg:border border-gray-200 px-2 py-5 lg:p-10 flex flex-col h-full">
            <h3 className="text-2xl text-primary">
              Newsletter <span className="font-bold">Signup</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Enter your email below to stay updated with Filinvest's new
              developments and offers!
            </p>

            <SubscriberForm />
          </div>

          <div className="lg:border border-gray-200 px-2 py-5 lg:p-10 flex flex-col h-full">
            <h3 className="text-2xl text-primary">
              <span className="font-bold">Blogs</span>
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Discover expert tips and insights for creating a{" "}
              <span className="font-semibold">stylish, functional home</span>.
            </p>
            <div className="mt-2 lg:mt-6">
              <Button
                type="button"
                className="bg-primary text-white"
                as={Link}
                href="/user/articles/blogs"
              >
                See More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Others;
