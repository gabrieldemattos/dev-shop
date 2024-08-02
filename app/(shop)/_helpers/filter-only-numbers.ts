export const filterOnlyNumbers = (value: string) => {
  if (typeof value !== "string") return "";

  const onlyNumeric = value.replace(/\D/g, "");

  return onlyNumeric;
};
