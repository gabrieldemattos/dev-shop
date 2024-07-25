export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export const formatHour = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);
};
