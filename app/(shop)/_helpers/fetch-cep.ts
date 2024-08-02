import { Dispatch, SetStateAction } from "react";
import {
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

export const fetchCep = async (
  postalCode: string,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setValue: UseFormSetValue<any>,
  setError: UseFormSetError<any>,
  clearErrors: UseFormClearErrors<any>,
  setIsValidPostalCode: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setIsLoading(true);
    const response = await fetch(
      `https://viacep.com.br/ws/${postalCode}/json/`,
    );
    const data = await response.json();

    setValue("street", data.logradouro ?? "");
    setValue("neighborhood", data.bairro ?? "");
    setValue("city", data.localidade ?? "");
    setValue("state", data.uf ?? "");

    setIsValidPostalCode(true);

    if (data.erro) {
      setIsValidPostalCode(false);
      setError("postalCode", {
        type: "custom",
        message: "CEP não encontrado.",
      });
    } else {
      // Limpar os erros dos campos
      clearErrors(["street", "neighborhood", "city", "state", "postalCode"]);
    }
  } catch (error) {
    setIsValidPostalCode(false);
    setError("postalCode", {
      type: "custom",
      message: "Erro ao buscar CEP.",
    });
  } finally {
    setIsLoading(false);
  }
};
