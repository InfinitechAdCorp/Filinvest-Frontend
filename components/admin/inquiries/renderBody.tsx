"use client";

import DestroyForm from "@/components/globals/destroyForm";
import {
  Column,
  InquiryDisplayFormat as DisplayFormat,
  Property,
  Inquiry as Record,
} from "@/types/globals";
import { TableCell, TableRow } from "@heroui/react";
import { EnvelopeIcon } from "@heroicons/react/24/solid"; 

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
            <a
              href={`mailto:${record.display_format?.email}?subject=Re: Inquiry about ${record.display_format?.property}`}
              className="text-blue-600 hover:text-blue-800"
              title="Reply"
            >
           <EnvelopeIcon className="w-10 h-10" />

            </a>
  
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
