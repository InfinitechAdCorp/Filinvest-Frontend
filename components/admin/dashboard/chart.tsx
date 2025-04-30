"use client";

import { ChartDatum } from "@/types/admin";
import { Card, CardBody, CardHeader } from "@heroui/react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

    months =
      new Date().getMonth() > 5 ? months.slice(6, 12) : months.slice(0, 6);

    const data = months.map((month) => {
      const datum = { month: month, Count: 0 };
      ufData.forEach((ufData) => {
        if (ufData.month?.startsWith(month)) {
          datum.Count = ufData.Count;
        }
      });
      return datum;
    });

    return data;
  };

  const data = formatMonthlyData(ufData);

  return (
    <Card className="py-4 pr-4">
      <CardHeader className="flex justify-center">
        <h3 className="text-3xl font-semibold">{title}</h3>
      </CardHeader>
      <CardBody className="h-[20rem]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
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
