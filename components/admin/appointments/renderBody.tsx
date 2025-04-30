"use client";

import DestroyForm from "@/components/globals/destroyForm";
import {
  Column,
  AppointmentDisplayFormat as DisplayFormat,
  Property,
  Appointment as Record,
} from "@/types/globals";
import { Chip, ChipProps, TableCell, TableRow } from "@heroui/react";
import AcceptForm from "./acceptForm";
import DeclineForm from "./declineForm";
import UpdateForm from "./updateForm";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[],
  dependencies: { properties: Property[] },
) => {
  const RenderCell = (
    url: string,
    model: string,
    column: string,
    record: Record,
    dependencies: {
      properties: Property[];
    },
  ) => {
    switch (column) {
      case "actions":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <AcceptForm url={url} model={model} record={record} />

            <DeclineForm url={url} model={model} record={record} />

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
