"use client";

import DestroyForm from "@/components/globals/destroyForm";
import {
  Column,
  InquiryDisplayFormat as DisplayFormat,
  Property,
  Inquiry as Record,
} from "@/types/globals";
import { TableCell, TableRow } from "@heroui/react";
import UpdateForm from "./updateForm";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[],
  dependencies: {
    properties: Property[];
  },
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
