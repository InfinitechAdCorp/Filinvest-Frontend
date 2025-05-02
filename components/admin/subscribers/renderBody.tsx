"use client";

import DestroyForm from "@/components/globals/destroyForm";
import {
  Column,
  SubscriberDisplayFormat as DisplayFormat,
  Subscriber as Record,
} from "@/types/globals";
import { TableCell, TableRow } from "@heroui/react";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[],
) => {
  const RenderCell = (
    url: string,
    model: string,
    column: string,
    record: Record,
  ) => {
    switch (column) {
      case "actions":
        return (
          <div className="relative flex items-center justify-start gap-2">
            {/* <UpdateForm url={url} model={model} record={record} /> */}

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
              {RenderCell(url, model, column.name, record)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RenderBody;
