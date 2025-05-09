"use client";

import { Image } from "@heroui/react";

const Details = () => {
  return (
    <>
      <div>
        <Image
          src="/images/office.jpg"
          alt="Filinvest Image"
          classNames={{
            wrapper: "flex rounded-lg shadow-xl min-w-full",
            img: "h-[16rem] w-full",
          }}
        />

        <div className="flex justify-between gap-5 space-y-5 px-2 py-5 md:space-y-0">
          <div>
            <h3 className="mb-3 text-2xl font-semibold text-primary">
              Customer Service
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-primary">Metro Manila:</strong>
                <span className="ml-2">
                  <a href="tel:+63285881688" className="hover:text-blue-500">
                    (63 2) 8-588-1688
                  </a>
                </span>
              </p>
              <p>
                <strong className="text-primary">Outside Metro Manila:</strong>
                <span className="ml-2">
                  <a href="tel:+1800105881688" className="hover:text-blue-500">
                    1800-10-588-1688
                  </a>
                </span>
              </p>
              <p>
                <strong className="text-primary">Email:</strong>
                <span className="ml-2">
                  <a href="mailto:servicedesk@filinvestland.com" className="hover:text-blue-500">
                    servicedesk@filinvestland.com
                  </a>
                </span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-2xl font-semibold text-primary">
              Sales Hotline
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong className="text-primary">Metro Manila:</strong>
                <span className="ml-2">
                  <a href="tel:+63288500888" className="hover:text-blue-500">
                    (63 2) 8-850-0888
                  </a>
                </span>
              </p>
              <p>
                <strong className="text-primary">Cebu:</strong>
                <span className="ml-2">
                  <a href="tel:+639190764836" className="hover:text-blue-500">
                    (63 919) 076-4836
                  </a>
                </span>
              </p>
              <p>
                <strong className="text-primary">Davao:</strong>
                <span className="ml-2">
                  <a href="tel:+639190764836" className="hover:text-blue-500">
                    (63 919) 076-4836
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
