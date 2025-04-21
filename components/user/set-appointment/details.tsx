"use client";

import React from "react";
import { Image } from "@heroui/react";

const Details = () => {
  return (
    <div className="w-[25.5rem]">
      <div className="rounded-lg">
        <Image
          src="/images/office.jpg"
          alt="Filinvest Image"
          classNames={{
            wrapper: "flex rounded-lg shadow-xl",
            img: "h-[13rem]",
          }}
        />
      </div>

      <div className="flex flex-col justify-center p-5">
        <div className="mb-2">
          <h2 className="text-start text-primary text-xl font-semibold">
            Contact Us
          </h2>
        </div>

        <div className="flex justify-between">
          <div>
            <ul className="text-sm list-disc pl-5 space-y-4">
              <li>
                <strong>Filinvest Alabang, Inc.</strong>
                <br />
                (63 2) 8846-0278
              </li>
              <li>
                <strong>Head Office</strong>
                <br />
                (63 2) 7918-818
              </li>
              <li>
                <strong>Alabang Office</strong>
                <br />
                (63 2) 8842-9874
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-sm list-disc pl-5 space-y-4">
              <li>
                <strong>Festival Mall Office</strong>
                <br />
                (63 2) 8850-3575
              </li>
              <li>
                <strong>Cebu Office</strong>
                <br />
                (63 32) 517-1888
              </li>
              <li>
                <strong>Davao Office</strong>
                <br />
                (63 82) 226-8802
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
