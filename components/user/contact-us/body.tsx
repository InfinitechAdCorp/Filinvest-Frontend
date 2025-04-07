"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import InquiryForm from "@/components/user/contact-us/inquiryForm";
import Details from "@/components/user/contact-us/details";
import { Property } from "@/types/globals";

type Props = {
  properties: Property[];
};

const Body = ({ properties }: Props) => {
  return (
    <Card>
      <CardBody className="p-5">
        <div className="flex justify-between gap-7">
          <InquiryForm properties={properties} />
          <Details />
        </div>
      </CardBody>
    </Card>
  );
};

export default Body;
