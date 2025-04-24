"use client";

import React from "react";
import { TableRow, TableCell, Chip, ChipProps } from "@heroui/react";
import { Column, Property } from "@/types/globals";
import {
  Appointment as Record,
  AppointmentDisplayFormat as DisplayFormat,
} from "@/types/globals";
import UpdateForm from "./updateForm";
import DestroyForm from "@/components/globals/destroyForm";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[],
  dependencies: { properties: Property[] }
) => {
  const RenderCell = (
    url: string,
    model: string,
    column: string,
    record: Record,
    dependencies: {
      properties: Property[];
    }
  ) => {
    switch (column) {
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <AcceptForm url={url} model={model} record={record} />

            <UpdateForm
              url={url}
              model={model}
              record={record}
              properties={dependencies.properties}
            />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "status":
        type Status = "Accepted" | "Declined" | "Pending";

        const colors = {
          Accepted: "success",
          Declined: "danger",
          Pending: "warning",
        };

        const value = record.display_format![column as keyof DisplayFormat];

        return (
          <Chip
            color={colors[value as Status] as ChipProps["color"]}
            size="sm"
            variant="flat"
          >
            {value}
          </Chip>
        );
      default:
        return record.display_format![column as keyof DisplayFormat];
    }
  };

  return (
    <>
      {records.map((record) => (
        <TableRow key={record.id}>
          {columns.map((column) => (
            <TableCell key={column.name}>
              {RenderCell(url, model, column.name, record, dependencies)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
