"use client";

import CountCard from "@/components/admin/dashboard/countCard";
import { ChartDatum } from "@/types/admin";
import { Card, CardBody } from "@heroui/react";
import React from "react";
import Chart from "./chart";

type Props = {
  cards: {
    url: string;
    model: string;
    count: number;
    color: string;
    Icon: React.JSX.Element;
  }[];
  charts: { appointments: ChartDatum[]; inquiries: ChartDatum[] };
};

const Body = ({ cards, charts }: Props) => {
  return (
    <div>
      <Card className="my-12 p-3">
        <CardBody>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {cards.map((card) => (
                <CountCard
                  key={card.model}
                  url={card.url}
                  model={card.model}
                  count={card.count}
                  color={card.color}
                  Icon={card.Icon}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Chart title="Monthly Appointments" data={charts.appointments} />

              <Chart title="Monthly Inquiries" data={charts.inquiries} />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Body;
