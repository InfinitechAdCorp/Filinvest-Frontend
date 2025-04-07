"use server";

import {
  Column,
  FAQ as Record,
  FAQDisplayFormat as DisplayFormat,
} from "@/types/globals";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      question: "",
      answer: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
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
