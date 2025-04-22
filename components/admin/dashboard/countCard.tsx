"use client";

import { Card, CardBody } from "@heroui/react";
import React from "react";

type Props = {
  model: string;
  count: number;
  color: string;
  Icon: React.JSX.Element;
};

const CountCard = ({ model, count, color, Icon }: Props) => {
  const textClass = `text-${color}-700 text-4xl font-semibold`;
  return (
    <div>
      <Card
        key={model}
        className={`shadow-none rounded-xl border-gray-300 py-4 px-2 bg-${color}-200`}
      >
        <CardBody>
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className={textClass}>{count}</h1>
              <h1 className={textClass}>{model}</h1>
            </div>
            <div className={textClass}>{Icon}</div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CountCard;
