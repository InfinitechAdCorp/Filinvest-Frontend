"use server";

import {
  Column,
  SubscriberDisplayFormat as DisplayFormat,
  Subscriber as Record,
} from "@/types/globals";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      email: "",
    };

    columns.forEach((column) => {
      const name = column.name;
      let value;

      switch (name) {
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
