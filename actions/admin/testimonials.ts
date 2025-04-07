"use server"

import { Column, Testimonial, TestimonialDisplayFormat } from "@/types/globals";

export const displayFormat = async (
    columns: Column[],
    records: Testimonial[]
  ) => {  
    records.forEach((record) => {
      const display_format = {
        name: "",
        message: "",
      };
  
      columns.forEach((column) => {
        const key = column.key;
        let value;
  
        switch (key) {
          default:
            value = record[key as keyof Testimonial];
            break;
        }
  
        if (value) {
          display_format[key as keyof TestimonialDisplayFormat] = `${value}`;
        }
      });
  
      record.display_format = display_format;
    });
  
    return records;
  };
  