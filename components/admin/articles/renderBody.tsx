"use client";

import React, { useState } from "react";
import { TableRow, TableCell, Image } from "@heroui/react";
import { Column } from "@/types/globals";
import {
  Article as Record,
  ArticleDisplayFormat as DisplayFormat,
} from "@/types/globals";
import DestroyForm from "@/components/globals/destroyForm";
import UpdateForm from "./updateForm";

const RenderBody = (
  url: string,
  model: string,
  columns: Column[],
  records: Record[]
) => {
  const [recordVisibility, setRecordVisibility] = useState(
    records.map((record) => {
      return { id: record.id, isShown: false };
    })
  );

  const getClassName = (id: string) => {
    const record = recordVisibility.find((record) => record.id == id);
    const className = record!.isShown
      ? ""
      : "overflow-hidden whitespace-nowrap text-ellipsis";
    return className;
  };

  const toggleVisibility = (id: string) => {
    const updatedRecordVisibility = recordVisibility.map((record) => {
      if (record.id == id) {
        return {
          ...record,
          isShown: !record.isShown,
        };
      } else {
        return record;
      }
    });
    setRecordVisibility(updatedRecordVisibility);
  };

  const getActionText = (id: string) => {
    const record = recordVisibility.find((record) => record.id == id);
    const actionText = record!.isShown ? "Show Less" : "Show More";
    return actionText;
  };

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
      case "description":
        return (
          <div className={`max-w-[30rem] ${getClassName(record.id)}`}>
            <span>{record.display_format![column as keyof DisplayFormat]}</span>
            <h3
              className="text-primary font-semibold cursor-pointer"
              onClick={() => toggleVisibility(record.id)}
            >
              {getActionText(record.id)}
            </h3>
          </div>
        );
      case "image":
        return (
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_S3_URL}/articles/${record.display_format![column as keyof DisplayFormat]}`}
              alt="Article"
              className="w-80"
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
