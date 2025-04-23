"use server";

import {
  Column,
  Offering as Record,
  OfferingDisplayFormat as DisplayFormat,
} from "@/types/globals";
import { formatNumber } from "@/utils/formatters";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      property: "",
      type: "",
      area: "",
      image: "",
    };

    columns.forEach((column) => {
      const name = column.name;
      let value;

      switch (name) {
        case "property":
          value = record.property.name;
          break;
        case "area":
          value = `${formatNumber(record.minimum_area)} - ${formatNumber(record.maximum_area)} sqm`;
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
