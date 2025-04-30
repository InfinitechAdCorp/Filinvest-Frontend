"use client";

import DestroyForm from "@/components/globals/destroyForm";
import Gallery from "@/components/globals/gallery";
import {
  Column,
  OfferingDisplayFormat as DisplayFormat,
  Offering as Record,
} from "@/types/globals";
import { TableCell, TableRow } from "@heroui/react";
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
            <UpdateForm url={url} model={model} record={record} />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "image":
        return (
          <div>
            <Gallery
              className="w-32 rounded-xl"
              images={[
                {
                  url: `${process.env.NEXT_PUBLIC_S3_URL}/properties/offerings/${record.display_format![column as keyof DisplayFormat]}`,
                  name: `${record.type} (${record.display_format?.area})`,
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
