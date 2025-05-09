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
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec",
    ];

    months = new Date().getMonth() > 5 ? months.slice(6, 12) : months.slice(0, 6);

    const data = months.map((month) => {
      const datum = { month: month, Count: 0 };
      ufData.forEach((entry) => {
        if (entry.month?.startsWith(month)) {
          datum.Count = entry.Count;
        }
      });
      return datum;
    });

    return data;
  };

  const data = formatMonthlyData(ufData);

  return (
    <div className="w-full px-4 mb-6">
      <Card className="w-full p-4">
        <CardHeader className="flex justify-center">
          <h3 className="text-2xl font-semibold">{title}</h3>
        </CardHeader>
        <CardBody className="h-[20rem]">
          <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
};

export default Chart;
