"use client";

import React from "react";
import CountCard from "@/components/admin/dashboard/countCard";
import { Card, CardBody, CardHeader } from "@heroui/react";
import Chart from "./chart";

type Card = {
  model: string;
  count: number;
  color: string;
  Icon: React.JSX.Element;
};

const Body = ({ cards }: { cards: Card[] }) => {
  return (
    <div>
      <Card className="my-12 p-3">
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {cards.map((card) => (
                <CountCard
                  key={card.model}
                  model={card.model}
                  count={card.count}
                  color={card.color}
                  Icon={card.Icon}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="pr-4 py-4">
                <CardHeader className="flex justify-center">
                  <h3 className="text-3xl font-semibold">
                    Monthly Appointments
                  </h3>
                </CardHeader>
                <CardBody className="h-[20rem]">
                  <Chart />
                </CardBody>
              </Card>

              <Card className="pr-4 py-4">
                <CardHeader className="flex justify-center">
                  <h3 className="text-3xl font-semibold">
                    Monthly Appointments
                  </h3>
                </CardHeader>
                <CardBody className="h-[20rem]">
                  <Chart />
                </CardBody>
              </Card>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Body;
