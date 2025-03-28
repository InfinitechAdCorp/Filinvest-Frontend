"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import React from "react";
import { HiLink } from "react-icons/hi2";
import { Card, Chip, Image } from "@heroui/react";
import { FaBuilding } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { RiLandscapeFill } from "react-icons/ri";
import { formatPeso } from "@/utils/formatters";
import { Property } from "@/types/user";

type Props = {
  property: Property;
};

const Details = ({ property }: Props) => {
  const units = [
    {
      id: "1",
      type: "1BR",
    },
    {
      id: "2",
      type: "3BR",
    },
    {
      id: "3",
      type: "Studio",
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center mx-60 my-7 w-[900px]">
      <div className="relative w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          className="w-full"
        >
          {["image1", "image2"].map((img: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative w-full flex justify-center">
                <Image
                  src="https://filinvest-bakit.s3.ap-southeast-1.amazonaws.com/properties/images/01jqd3n6h9vd763e3d2446ftan.jpg"
                  alt="Property"
                  width={1200}
                  height={500}
                  className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute top-4 sm:top-8 left-4 sm:left-10 z-10 p-2 rounded-lg">
          <div className="w-[120px] sm:w-[200px] lg:w-[250px]">
            <Image
              alt="Property Logo"
              className="object-cover w-full h-full"
              src="https://filinvest-bakit.s3.ap-southeast-1.amazonaws.com/properties/images/01jqd3n6h9vd763e3d2446ftan.jpg"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <div className="flex flex-col sm:justify-between sm:items-center">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-2xl text-primary font-semibold">
              100 West
            </h1>

            <p className="text-medium text-justify lg:text-lg italic text-gray-900 mt-2">
              There’s nothing more valuable than time. Especially when you are
              losing precious moments that you should have spent with your
              family. 100 West has been designed with this in mind. Here, you
              literally don’t have to go far to be where you need to be. All you
              need to live, work and play are here under one roof. Time can’t be
              replaced. Stop throwing away hours waiting for an elevator, trying
              to hail a cab, or sitting in traffic. Start spending more of it
              where it really matters – at home at 100 West Makati.
            </p>
          </div>

          <div className="mt-4 space-y-1">
            <h3 className="text-gray-800 text-lg">Makati</h3>

            <div className="flex lg:flex-wrap gap-2">
              <Chip
                variant="flat"
                color="primary"
                startContent={<HiLink className="w-4 h-4" />}
                className="flex items-center px-3 py-1"
              >
                High Rise Condominium
              </Chip>
              <Chip
                variant="flat"
                color="primary"
                startContent={<HiLink className="w-4 h-4" />}
                className="flex items-center px-3 py-1"
              >
                For Sale
              </Chip>
              <Chip
                variant="flat"
                color="primary"
                startContent={<HiLink className="w-4 h-4" />}
                className="flex items-center px-3 py-1"
              >
                RFO
              </Chip>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <Card
                radius="sm"
                className="mt-2 flex justify-center items-start max-w-xs p-2 lg:p-3"
              >
                <div className="flex justify-between gap-3 items-center ">
                  <Chip radius="full" variant="flat" color="primary">
                    <IoMdPricetags className="w-5 h-5 text-blue-800" />
                  </Chip>
                  <h3 className="text-medium text-gray-900">
                    {formatPeso(5000000)} | {formatPeso(15000000)}
                  </h3>
                </div>
              </Card>
              <Card
                radius="sm"
                className="mt-2 flex justify-center items-start max-w-xs p-2 lg:p-3"
              >
                <div className="flex justify-between gap-3 items-center ">
                  <Chip radius="full" color="primary" variant="flat">
                    <FaBuilding className="w-5 h-5 text-blue-800" />
                  </Chip>
                  {units?.length > 0 ? (
                    units.map((item) => (
                      <div key={item.id}>
                        <h3 className="text-medium text-gray-900">
                          {item.type} |
                        </h3>
                      </div>
                    ))
                  ) : (
                    <p>No units available</p>
                  )}
                </div>
              </Card>
              <Card
                radius="sm"
                className="mt-2 flex justify-center items-start max-w-xs p-2 lg:p-3"
              >
                <div className="flex justify-between gap-3 items-center ">
                  <Chip color="primary" variant="flat" radius="full">
                    <RiLandscapeFill className="w-5 h-5 text-blue-800" />
                  </Chip>
                  <h3 className="text-medium text-gray-900">
                    29.3 - 54.01 sqm ±
                  </h3>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
