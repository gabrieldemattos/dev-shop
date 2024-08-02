import { Country, State } from "@prisma/client";
import { toast } from "sonner";
import { registerAddress } from "../_actions/register-address";
import { isValidState } from "../_helpers/is-valid-state";
import { brazilianStates } from "../_helpers/country-states";
import { checkValidationPostalCode } from "../_helpers/check-validation-postalcode";
import { AddressFormData } from "../_types/address-type";
import { fetchCep } from "../_helpers/fetch-cep";
import { useEffect, useState } from "react";
import { filterOnlyNumbers } from "../_helpers/filter-only-numbers";
import { addressSchema } from "../_schemas/register-new-address-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export const useRegisterNewAddress = () => {
  const { data } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidPostalCode, setIsValidPostalCode] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const postalCode = watch("postalCode");
  const number = watch("number");
  const ddd = watch("ddd");
  const telephone = watch("telephone");

  useEffect(() => {
    setValue("number", filterOnlyNumbers(number));
  }, [number, setValue]);

  useEffect(() => {
    setValue("ddd", filterOnlyNumbers(ddd));
  }, [ddd, setValue]);

  useEffect(() => {
    setValue("telephone", filterOnlyNumbers(telephone));
  }, [telephone, setValue]);

  useEffect(() => {
    setValue("postalCode", filterOnlyNumbers(postalCode));

    if (!postalCode) return;

    if (postalCode && postalCode.length === 8)
      fetchCep(
        postalCode,
        setIsLoading,
        setValue,
        setError,
        clearErrors,
        setIsValidPostalCode,
      );
  }, [postalCode, setValue, clearErrors, setError]);

  const registerNewAddress = async (address: AddressFormData) => {
    if (!data?.user.id) return;

    const isValidBrazilianState = isValidState(
      brazilianStates,
      address.state.toUpperCase(),
    );

    if (!isValidBrazilianState)
      return setError("state", { message: "Estado inválido." });

    try {
      setIsLoading(true);
      await registerAddress(data?.user.id, {
        user: {
          connect: { id: data?.user.id },
        },
        firstName: address.firstName.toLowerCase(),
        lastName: address.lastName.toLowerCase(),
        label: address.label.toLowerCase(),
        street: address.street.toLowerCase(),
        number: address.number,
        neighborhood: address.neighborhood.toLowerCase(),
        city: address.city.toLowerCase(),
        state: address.state.toUpperCase() as State,
        country: "BRA" as Country,
        postalCode: address.postalCode,
        telephoneDDD: address.ddd,
        telephoneNumber: address.telephone,
        reference: address.reference?.toLowerCase(),
        complement: address.complement?.toLowerCase(),
      });

      toast.success("Endereço adicionado com sucesso!", {
        description: "Novo endereço adicionado!",
        position: "bottom-center",
        duration: 4000,
      });

      reset();
    } catch (error) {
      toast.error("Erro ao criar novo endereço, tente novamente!", {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitAdressForm = async (address: AddressFormData) => {
    if (
      !checkValidationPostalCode(
        address.postalCode,
        isValidPostalCode,
        setError,
      )
    )
      return;

    registerNewAddress(address);
  };

  return {
    register,
    handleSubmit,
    handleSubmitAdressForm,
    getValues,
    postalCode,
    isValidPostalCode,
    isLoading,
    errors,
  };
};
