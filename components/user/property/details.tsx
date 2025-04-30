"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Property } from "@/types/globals";
import { formatNumber, formatNumberShort } from "@/utils/formatters";
import { Card, Chip, Image } from "@heroui/react";
import { HiHome, HiLink } from "react-icons/hi2";
import { IoMdPricetags } from "react-icons/io";
import { RiLandscapeFill } from "react-icons/ri";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Props = {
  property: Property;
};

const Details = ({ property }: Props) => {
  const offeringTypes = property.offerings.map((offering) => offering.type);

  return (
    <div className="w-full">
      <div>
        <Swiper
          className="rounded-lg"
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
        >
          {JSON.parse(property.images).map((image: string, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative flex w-full justify-center">
                <Image
                  src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/images/${image}`}
                  alt="Property"
                  width={1200}
                  height={500}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="z-3 absolute left-7 top-7 rounded-lg p-2">
          <div className="w-[13.75rem]">
            <Image
              alt="Logo"
              className="object-cover"
              src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/logos/${property.logo}`}
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col space-y-5 sm:items-start sm:justify-between">
        <div className="mt-4 space-y-1">
          <h3 className="text-xl font-semibold text-primary sm:text-2xl lg:text-2xl">
            {property.name}
          </h3>

          <h3 className="text-lg text-gray-800">{property.location}</h3>

          <div className="flex gap-2 lg:flex-wrap">
            <Chip
              variant="flat"
              color="primary"
              startContent={<HiLink className="h-4 w-4" />}
              className="flex items-center px-3 py-1"
            >
              {property.type}
            </Chip>

            <Chip
              variant="flat"
              color="primary"
              startContent={<HiLink className="h-4 w-4" />}
              className="flex items-center px-3 py-1"
            >
              For Sale
            </Chip>

            <Chip
              variant="flat"
              color="primary"
              startContent={<HiLink className="h-4 w-4" />}
              className="flex items-center px-3 py-1"
            >
              {property.status}
            </Chip>
          </div>

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
            <Card
              radius="sm"
              className="mt-2 flex max-w-xs items-start justify-center p-2 lg:p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <Chip radius="full" variant="flat" color="primary">
                  <IoMdPricetags className="h-5 w-5 text-blue-800" />
                </Chip>

                <h3 className="text-medium text-gray-900">
                  {`₱${formatNumberShort(property.minimum_price)} - ₱${formatNumberShort(property.maximum_price)}`}
                </h3>
              </div>
            </Card>
            <Card
              radius="sm"
              className="mt-2 flex max-w-xs items-start justify-center p-2 lg:p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <Chip radius="full" color="primary" variant="flat">
                  <HiHome className="h-5 w-5 text-blue-800" />
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
              className="mt-2 flex max-w-xs items-start justify-center p-2 lg:p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <Chip color="primary" variant="flat" radius="full">
                  <RiLandscapeFill className="h-5 w-5 text-blue-800" />
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
          {property.description.split("\n").map((string, index) => (
            <div key={index}>
              {string == "" ? (
                <br />
              ) : (
                <p className="text-justify text-medium italic text-gray-900 lg:text-lg">
                  {string}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
