"use client";

import React from "react";
import { TableRow, TableCell, Image } from "@heroui/react";
import { Column } from "@/types/globals";
import {
  Offering as Record,
  OfferingDisplayFormat as DisplayFormat,
} from "@/types/globals";
import DestroyForm from "@/components/globals/destroyForm";
import UpdateForm from "./updateForm";

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
            <UpdateForm url={url} model={model} record={record} />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "image":
        return (
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL}/properties/offerings/${record.display_format![column as keyof DisplayFormat]}`}
              alt="Article"
              className="w-32"
            />
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
