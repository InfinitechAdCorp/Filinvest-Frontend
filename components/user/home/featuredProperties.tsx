"use client";

import React from "react";
import { Card, CardBody, CardHeader, Chip, Image } from "@heroui/react";
import { HiLink } from "react-icons/hi2";
import { Property } from "@/types/globals";
import { formatNumberShort } from "@/utils/formatters";
import Link from "next/link";

type Props = {
  properties: Property[];
};

const FeaturedProperties = ({ properties }: Props) => {
  return (
    <>
      <div className="mt-2 flex flex-wrap items-start justify-between gap-8 md:flex-nowrap">
        <div className="mx-60 flex w-full flex-wrap justify-center gap-4 p-2">
          {properties.length > 0 ? (
            <>
              {properties.map((property) => (
                <Card
                  key={property.id}
                  as={Link}
                  className="w-[20rem] p-1"
                  isPressable
                  href={`/properties/${property.id}`}
                >
                  <CardHeader className="pb-0">
                    <Image
                      alt="Property"
                      className="h-[11rem] w-full rounded-xl object-cover"
                      src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/images/${JSON.parse(property.images)[0]}`}
                    />
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <h3 className="text-large font-bold text-primary">
                      {property.name}
                    </h3>
                    <h3 className="text-sm text-gray-700">
                      {property.location}
                    </h3>
                    <h3 className="text-sm font-bold text-gray-600">
                      {`₱${formatNumberShort(property.minimum_price)} - ₱${formatNumberShort(property.maximum_price)}`}
                    </h3>

                    <div className="mt-3 space-y-1">
                      <div className="flex gap-1">
                        <Chip
                          size="sm"
                          variant="flat"
                          color="primary"
                          startContent={<HiLink className="h-4 w-4" />}
                          className="flex items-center justify-between px-2 py-1 text-xs"
                        >
                          {property.type}
                        </Chip>

                        <Chip
                          size="sm"
                          variant="flat"
                          color="primary"
                          startContent={<HiLink className="h-4 w-4" />}
                          className="flex items-center justify-between px-2 py-1 text-xs"
                        >
                          For Sale
                        </Chip>

                        <Chip
                          size="sm"
                          variant="flat"
                          color="primary"
                          startContent={<HiLink className="h-4 w-4" />}
                          className="flex items-center justify-between px-2 py-1 text-xs"
                        >
                          {property.status}
                        </Chip>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </>
          ) : (
            <div className="flex justify-center">
              <h3 className="font-semibold">No Featured Properties Found</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedProperties;
