"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column, Property } from "@/types/globals";
import {
  Inquiry as Record,
  InquiryDisplayFormat as DisplayFormat,
} from "@/types/globals";
import UpdateForm from "./updateForm";
import DestroyForm from "@/components/globals/destroyForm";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[],
  dependencies: {
    properties: Property[];
  }
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
            <UpdateForm
              url={url}
              model={model}
              record={record}
              properties={dependencies.properties}
            />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
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
