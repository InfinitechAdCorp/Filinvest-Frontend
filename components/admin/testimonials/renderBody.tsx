"use client";

import DestroyForm from "@/components/globals/destroyForm";
import {
  Column,
  TestimonialDisplayFormat as DisplayFormat,
  Testimonial as Record,
} from "@/types/globals";
import { TableCell, TableRow } from "@heroui/react";
import SetIsPublishedForm from "./setIsPublishedForm";
import UpdateForm from "./updateForm";

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
            <SetIsPublishedForm url={url} model={model} record={record} />

            <UpdateForm url={url} model={model} record={record} />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "message":
        return (
          <div
            className={`max-w-[30rem] overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            <span>{record.display_format![column as keyof DisplayFormat]}</span>
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
