"use client";

import { Property } from "@/types/globals";
import { Card, CardBody } from "@heroui/react";
import AppointmentForm from "./appointmentForm";
import Details from "./details";

type Props = {
  properties: Property[];
};

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
