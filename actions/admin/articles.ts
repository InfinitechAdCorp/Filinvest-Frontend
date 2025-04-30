"use server";

import {
  Column,
  ArticleDisplayFormat as DisplayFormat,
  Article as Record,
} from "@/types/globals";
import { formatDate } from "@/utils/formatters";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      name: "",
      date: "",
      description: "",
      image: "",
    };

    columns.forEach((column) => {
      const name = column.name;
      let value;

      switch (name) {
        case "date":
          value = formatDate(record[name as keyof Record] as string);
          break;
        default:
          value = record[name as keyof Record];
          break;
      }

      if (value) {
        display_format[name as keyof DisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};
