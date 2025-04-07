"use server";

import {
  Column,
  Inquiry as Record,
  InquiryDisplayFormat as DisplayFormat,
} from "@/types/globals";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      property: "",
      first_name: "",
      last_name: "",
      gender: "",
      landline: "",
      mobile: "",
      email: "",
      city: "",
      country: "",
      message: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "property":
          value = record.property.name;
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
