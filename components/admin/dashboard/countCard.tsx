"use client";

import React from "react";
import { Card, CardBody, Link } from "@heroui/react";

type Props = {
  url: string;
  model: string;
  count: number;
  color: string;
  Icon: React.JSX.Element;
};

const CountCard = ({ url, model, count, color, Icon }: Props) => {
  return (
    // bg-green-200 bg-yellow-200 bg-blue-200 bg-pink-200
    // text-green-200 text-yellow-200 text-blue-200 text-pink-200
    <div>
      <Card
        key={model}
        as={Link}
        href={url}
        className={`shadow-none rounded-xl border-gray-300 py-4 px-2 cursor-pointer bg-${color}-200`}
      >
        <CardBody>
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className={`text-3xl font-semibold text-${color}-700`}>
                {count}
              </h1>
              <h1 className={`text-3xl font-semibold text-${color}-700`}>
                {model}
              </h1>
            </div>
            <div className={`text-3xl font-semibold text-${color}-700`}>
              {Icon}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CountCard;
