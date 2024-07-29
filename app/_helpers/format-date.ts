export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export const formatHour = (date: Date, timeZone: string = "UTC") => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
    timeZone: timeZone,
  }).format(date);
};
