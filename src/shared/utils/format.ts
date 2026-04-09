export const formatDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};