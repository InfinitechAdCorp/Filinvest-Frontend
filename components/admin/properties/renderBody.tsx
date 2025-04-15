"use client";

import React from "react";
import { TableRow, TableCell, Image } from "@heroui/react";
import { Column } from "@/types/globals";
import {
  Property as Record,
  PropertyDisplayFormat as DisplayFormat,
} from "@/types/globals";

const RenderCell = (model: string, column: string, record: Record) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-start items-center gap-2">
          Actions
        </div>
      );
    case "logo":
      return (
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/logos/${record.display_format![column as keyof DisplayFormat]}`}
            alt="Logo"
            className="w-full"
          />
        </div>
      );
    default:
      return record.display_format![column as keyof DisplayFormat];
  }
};

const RenderBody = (model: string, columns: Column[], records: Record[]) => {
  return (
    <>
      {records.map((record) => (
        <TableRow key={record.id}>
          {columns.map((column) => (
            <TableCell key={column.name}>
              {RenderCell(model, column.name, record)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
