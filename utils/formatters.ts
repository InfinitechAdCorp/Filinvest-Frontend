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
