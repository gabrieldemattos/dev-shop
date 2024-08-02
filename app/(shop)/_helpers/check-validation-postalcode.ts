import { UseFormSetError } from "react-hook-form";

export const checkValidationPostalCode = (
  postalCode: string,
  isValidPostalCode: boolean,
  setError: UseFormSetError<any>,
) => {
  if (!postalCode) {
    setError("postalCode", { message: "CEP inválido." });
    return false;
  }

  if (postalCode.length < 8) {
    setError("postalCode", { message: "O CEP deve conter 8 dígitos." });
    return false;
  }

  if (!isValidPostalCode) {
    setError("postalCode", { message: "CEP não encontrado." });
    return false;
  }

  return true;
};
