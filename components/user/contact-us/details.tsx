"use client";

import { Image } from "@heroui/react";
import React from "react";

const Details = () => {
  return (
    <>
      <div className="mt-10">
        <Image
          src="/images/contact-us.jpg"
          alt="Filinvest Image"
          className="rounded-lg shadow-xl object-cover w-full h-[500px]"
        />

        <div className="flex flex-col md:flex-row justify-between items-start px-2 py-5 space-y-5 md:space-y-0 md:space-x-10">
          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-2xl font-semibold text-primary mb-3">
              Customer Service
            </h1>
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-primary">Metro Manila:</strong>
                <span className="ml-2">(63 2) 8-588-1688</span>
              </p>
              <p>
                <strong className="text-primary">Outside Metro Manila:</strong>
                <span className="ml-2">
                  Domestic Toll Free for PLDT/Smart landline: 1800-10-588-1688
                </span>
              </p>
              <p>
                <strong className="text-primary">Email:</strong>
                <span className="ml-2">servicedesk@filinvestland.com</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/2">
            <h1 className="text-2xl font-semibold text-primary mb-3">
              Sales Hotline
            </h1>
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-primary">Metro Manila:</strong>
                <span className="ml-2">(63 2) 8-850-0888</span>
              </p>
              <p>
                <strong className="text-primary">Cebu:</strong>
                <span className="ml-2">(63 919) 076-4836</span>
              </p>
              <p>
                <strong className="text-primary">Davao:</strong>
                <span className="ml-2">(63 919) 076-4836</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
