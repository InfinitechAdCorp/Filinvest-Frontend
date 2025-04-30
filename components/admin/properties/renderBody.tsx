"use client";

import DestroyForm from "@/components/globals/destroyForm";
import Gallery from "@/components/globals/gallery";
import ViewButton from "@/components/globals/viewButton";
import {
  Column,
  PropertyDisplayFormat as DisplayFormat,
  Property as Record,
} from "@/types/globals";
import { TableCell, TableRow } from "@heroui/react";
import SetIsFeaturedForm from "./setIsFeaturedForm";
import SetIsPublishedForm from "./setIsPublishedForm";
import UpdateForm from "./update/updateForm";

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
            <SetIsFeaturedForm url={url} model={model} record={record} />

            <SetIsPublishedForm url={url} model={model} record={record} />

            <ViewButton
              title="View Offerings"
              url={`/admin/properties/${record.id}`}
            />

            <UpdateForm url={url} model={model} record={record} />

            <DestroyForm url={url} model={model} id={record.id} />
          </div>
        );
      case "logo":
        return (
          <div>
            <Gallery
              images={[
                {
                  url: `${process.env.NEXT_PUBLIC_S3_URL}/properties/logos/${record.display_format![column as keyof DisplayFormat]}`,
                  name: `${record.name} Logo`,
                },
              ]}
            />
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
