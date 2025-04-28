"use client";

import React from "react";
import { TableRow, TableCell } from "@heroui/react";
import { Column } from "@/types/globals";
import {
  Testimonial as Record,
  TestimonialDisplayFormat as DisplayFormat,
} from "@/types/globals";
import UpdateForm from "./updateForm";
import DestroyForm from "@/components/globals/destroyForm";
import SetIsPublishedForm from "./setIsPublishedForm";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[]
) => {
  const RenderCell = (
    url: string,
    model: string,
    column: string,
    record: Record
  ) => {
    switch (column) {
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <SetIsPublishedForm url={url} model={model} record={record} />

            <UpdateForm url={url} model={model} record={record} />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "message":
        return (
          <div
            className={`max-w-[30rem] overflow-hidden whitespace-nowrap text-ellipsis`}
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
