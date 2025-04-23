"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartDatum } from "@/types/admin";

type Props = {
  title: string;
  data: ChartDatum[];
};

const Chart = ({ title, data: ufData }: Props) => {
  const formatMonthlyData = (ufData: ChartDatum[]) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    if (new Date().getMonth() > 5) {
      months = months.slice(6, 12);
    } else {
      months = months.slice(0, 6);
    }

    const data: ChartDatum[] = [];
    months.forEach((month) => {
      const datum = { month: month, Count: 0 };
      ufData.forEach((ufData) => {
        if (ufData.month?.startsWith(month)) {
          datum.Count = ufData.Count;
        }
      });
      data.push(datum);
    });

    return data;
  };

  const data = formatMonthlyData(ufData);

  return (
    <Card className="pr-4 py-4">
      <CardHeader className="flex justify-center">
        <h3 className="text-3xl font-semibold">{title}</h3>
      </CardHeader>
      <CardBody className="h-[20rem]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Count" fill="#003583" activeBar={<Rectangle />} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default Chart;
