"use server";

import {
  Column,
  Article as Record,
  ArticleDisplayFormat as DisplayFormat,
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
      const key = column.key;
      let value;

      switch (key) {
        case "date":
          value = formatDate(record[key as keyof Record] as Date);
          break;
        default:
          value = record[key as keyof Record];
          break;
      }

      if (value) {
        display_format[key as keyof DisplayFormat] = `${value}`;
      }
    });

    record.display_format = display_format;
  });

  return records;
};
