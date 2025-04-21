"use server";

import {
  Column,
  Inquiry as Record,
  InquiryDisplayFormat as DisplayFormat,
} from "@/types/globals";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      property: "",
      message: "",
    };

    columns.forEach((column) => {
      const name = column.name;
      let value;

      switch (name) {
        case "property":
          value = record.property.name;
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
