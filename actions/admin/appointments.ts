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
      const name = column.name;
      let value;

      switch (name) {
        case "property":
          value = record.property.name;
          break;
        case "date":
          value = formatDate(record[name as keyof Record] as string);
          break;
        case "time":
          const timestamp = `${record.date}T${record.time}.000000Z`;
          value = formatTime(timestamp);
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
