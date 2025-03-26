export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
