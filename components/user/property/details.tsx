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
import { formatNumber, formatNumberShort } from "@/utils/formatters";
import { Property } from "@/types/user";

type Props = {
  property: Property;
};

const Details = ({ property }: Props) => {
  const offeringTypes = property.offerings.map((offering) => offering.type);

  return (
    <div className="w-full">
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
          {JSON.parse(property.images).map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative w-full flex justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/images/${image}`}
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
          <div className="w-[120px] sm:w-[200px] lg:w-[220px]">
            <Image
              alt="Property Logo"
              className="object-cover"
              src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/logos/${property.logo}`}
            />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col sm:justify-between sm:items-start space-y-5">
        <div className="mt-4 space-y-1">
          <h3 className="text-xl sm:text-2xl lg:text-2xl text-primary font-semibold">
            {property.name}
          </h3>

          <h3 className="text-gray-800 text-lg">{property.location}</h3>

          <div className="flex lg:flex-wrap gap-2">
            <Chip
              variant="flat"
              color="primary"
              startContent={<HiLink className="w-4 h-4" />}
              className="flex items-center px-3 py-1"
            >
              {property.type}
            </Chip>
            <Chip
              variant="flat"
              color="primary"
              startContent={<HiLink className="w-4 h-4" />}
              className="flex items-center px-3 py-1"
            >
              {property.status}
            </Chip>
            <Chip
              variant="flat"
              color="primary"
              startContent={<HiLink className="w-4 h-4" />}
              className="flex items-center px-3 py-1"
            >
              {property.substatus}
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
                  {`₱${formatNumberShort(property.minimum_price)} - ₱${formatNumberShort(property.maximum_price)}`}
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
                {offeringTypes.length > 0 ? (
                  <div>
                    <h3>{offeringTypes.join(" | ")}</h3>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <h3 className="font-semibold">No Units Available</h3>
                  </div>
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
                  {formatNumber(property.minimum_area)} -{" "}
                  {formatNumber(property.maximum_area)} sqm ±
                </h3>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <p className="text-medium text-justify lg:text-lg italic text-gray-900">
            {property.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
