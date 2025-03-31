"use client";

import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Property } from "@/types/user";
import Details from "./details";
import AppointmentForm from "./appointmentForm";

type Props = {
    properties: Property[],
}

const Body = ({ properties }: Props) => {
  return (
    <Card>
      <CardBody className="p-5">
        <div className="flex justify-between gap-7">
          <Details />

          <AppointmentForm properties={properties} />
        </div>
      </CardBody>
    </Card>
  );
};

export default Body;
