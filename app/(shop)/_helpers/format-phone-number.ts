export const formatPhoneNumber = (ddd: string, telephone: string) => {
  let fullPhoneNumber = ddd + telephone;

  fullPhoneNumber = fullPhoneNumber.replace(/\D/g, "");

  fullPhoneNumber = fullPhoneNumber.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3",
  );

  return fullPhoneNumber;
};
