export const formatPhoneNumber = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/\D/g, "");

  phoneNumber = phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

  return phoneNumber;
};
