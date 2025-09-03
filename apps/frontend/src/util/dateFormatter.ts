export const formatDateLong = (date: Date) =>
  date.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
export const formatDateShort = (date: Date) =>
  date.toLocaleDateString("en-us", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
