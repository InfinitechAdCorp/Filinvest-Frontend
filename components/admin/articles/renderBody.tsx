"use client";

import React from "react";
import { TableRow, TableCell, Image } from "@heroui/react";
import { Column } from "@/types/globals";
import {
  Article as Record,
  ArticleDisplayFormat as DisplayFormat,
} from "@/types/globals";
import DestroyForm from "@/components/globals/destroyForm";
import UpdateForm from "./updateForm";
import Gallery from "@/components/globals/gallery";

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
            <UpdateForm url={url} model={model} record={record} />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "description":
        return (
          <div
            className={`max-w-[30rem] overflow-hidden text-ellipsis whitespace-nowrap`}
          >
            <span>{record.display_format![column as keyof DisplayFormat]}</span>
          </div>
        );
      case "image":
        return (
          <div>
            <Gallery
              className="w-80 rounded-xl"
              images={[
                {
                  url: `${process.env.NEXT_PUBLIC_S3_URL}/articles/${record.display_format![column as keyof DisplayFormat]}`,
                  name: record.name,
                },
              ]}
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
