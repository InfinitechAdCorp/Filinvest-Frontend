export const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPeso = (number: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(number);
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
