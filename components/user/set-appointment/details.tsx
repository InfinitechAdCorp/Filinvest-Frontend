"use client";

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
          <h2 className="text-start text-xl font-semibold text-primary">
            Contact Us
          </h2>
        </div>

        <div className="flex justify-between">
          <div>
            <ul className="list-disc space-y-4 pl-5 text-sm">
              <li>
                <strong>Filinvest Alabang, Inc.</strong>
                <br />
                <a
                  href="tel:+63288460278"
                  className="hover:text-blue-500"
                >
                  (63 2) 8846-0278
                </a>
              </li>
              <li>
                <strong>Head Office</strong>
                <br />
                <a
                  href="tel:+6327918818"
                  className="hover:text-blue-500"
                >
                  (63 2) 7918-818
                </a>
              </li>
              <li>
                <strong>Alabang Office</strong>
                <br />
                <a
                  href="tel:+63288429874"
                  className="hover:text-blue-500"
                >
                  (63 2) 8842-9874
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="list-disc space-y-4 pl-5 text-sm">
              <li>
                <strong>Festival Mall Office</strong>
                <br />
                <a
                  href="tel:+63288503575"
                  className="hover:text-blue-500"
                >
                  (63 2) 8850-3575
                </a>
              </li>
              <li>
                <strong>Cebu Office</strong>
                <br />
                <a
                  href="tel:+63325171888"
                  className="hover:text-blue-500"
                >
                  (63 32) 517-1888
                </a>
              </li>
              <li>
                <strong>Davao Office</strong>
                <br />
                <a
                  href="tel:+63822268802"
                  className="hover:text-blue-500"
                >
                  (63 82) 226-8802
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
