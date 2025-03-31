import { DateValue, parseDate } from "@internationalized/date";

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPeso = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

export const formatNumberShort = (number: number) => {
  const intlFormat = (number: number) => {
    return new Intl.NumberFormat().format(Math.round(number * 10) / 10);
  };
  if (number >= 1000000) return intlFormat(number / 1000000) + "M";
  else if (number >= 1000) return intlFormat(number / 1000) + "K";
  else return intlFormat(number);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const sortByDate = (
  records: any[],
  key: string,
  order: "asc" | "desc"
) => {
  records = records.sort((a, b) => {
    return Number(new Date(a[key])) - Number(new Date(b[key]));
  });
  return (records = order == "asc" ? records : records.reverse());
};

export const dateToDateValue = (date: Date) => {
  let dateValue;

  if (date) {
    const components = date.toLocaleDateString("en-CA").split("-");
    components[0] = components[0].padStart(4, "0");
    dateValue = parseDate(components.join("-"));
  }

  return dateValue;
};

export const dateValueToDate = (dateValue: DateValue | null) => {
  let date;

  if (dateValue) {
    date = new Date(new Date(dateValue.toString()).setUTCHours(0, 0, 0, 0));
  }

  return date;
};