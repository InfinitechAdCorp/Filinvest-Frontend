"use client";

import React from "react";
import CountCard from "@/components/admin/dashboard/countCard";
import { Card, CardBody } from "@heroui/react";

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
        </CardBody>
      </Card>
    </div>
  );
};

export default Body;
