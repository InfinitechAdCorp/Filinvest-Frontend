export const formatReadable = (string: string) => {
  return string.toUpperCase().replace("_", " ");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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

export const pluralize = (word: string) => {
  const vowels = ["a", "e", "i", "o", "u"];

  if (
    [...vowels, "x", "z", "sh", "ch"].some((char) => {
      return word.endsWith(char);
    })
  ) {
    return word + "es";
  }

  if (word.at(-1) == "y") {
    if (!vowels.includes(word.at(-2)!)) {
      return word.slice(0, -1) + "ies";
    }
  }

  const uncountables = ["news"];
  if (uncountables.includes(word.toLowerCase())) {
    return word;
  }

  return word + "s";
};
