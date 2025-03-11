export const formatPrice = (number: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = <T extends Record<string, any>>(
  data: T[],
  type: keyof T,
): (string | T[keyof T])[] => {
  let unique = data.map((item) => item[type]);

  if (type === "colors") {
    unique = unique.flat();
  }

  return ["all", ...new Set(unique)];
};
