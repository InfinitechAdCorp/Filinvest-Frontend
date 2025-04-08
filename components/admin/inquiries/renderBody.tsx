"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column } from "@/types/globals";
import {
  Inquiry as Record,
  InquiryDisplayFormat as DisplayFormat,
} from "@/types/globals";

const RenderCell = (model: string, column: string, record: Record) => {
  switch (column) {
    case "actions":
      return (
        <div className="relative flex justify-start items-center gap-2">
          Actions
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
            <TableCell key={column.key}>
              {RenderCell(model, column.key, record)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
