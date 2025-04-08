"use server";

import {
  Column,
  Appointment as Record,
  AppointmentDisplayFormat as DisplayFormat,
} from "@/types/globals";
import { formatDate, formatTime } from "@/utils/formatters";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      property: "",
      first_name: "",
      last_name: "",
      mobile: "",
      email: "",
      date: "",
      time: "",
      message: "",
      status: "",
    };

    columns.forEach((column) => {
      const key = column.key;
      let value;

      switch (key) {
        case "property":
          value = record.property.name;
          break;
        case "date":
          value = formatDate(record[key as keyof Record] as string);
          break;
        case "time":
          const timestamp = `${record.date}T${record.time}.000000Z`;
          value = formatTime(timestamp);
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
