"use server";

import {
  Column,
  Property as Record,
  PropertyDisplayFormat as DisplayFormat,
} from "@/types/globals";
import { formatNumber, formatNumberShort } from "@/utils/formatters";

export const displayFormat = async (columns: Column[], records: Record[]) => {
  records.forEach((record) => {
    const display_format = {
      name: "",
      logo: "",
      type: "",
      price: "",
      location: "",
      area: "",
      status: "",
      substatus: "",
      description: "",
      amenities: "",
    };

    columns.forEach((column) => {
      const name = column.name;
      let value;

      switch (name) {
        case "price":
          value = `${formatNumberShort(record.minimum_price)} - ${formatNumberShort(record.maximum_price)}`;
          break;
        case "area":
          value = `${formatNumber(record.minimum_area)} - ${formatNumber(record.maximum_area)} sqm`;
          break;
        case "amenities":
          value = JSON.parse(record[name as keyof Record] as string).length;
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
