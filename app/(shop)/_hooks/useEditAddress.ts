import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditAddressFormData } from "../_types/edit-address";
import { editAddressSchema } from "../_schemas/edit-address-schema";
import { useEffect, useState } from "react";
import { filterOnlyNumbers } from "../_helpers/filter-only-numbers";
import { useSession } from "next-auth/react";
import { IEditAddressData } from "../_interfaces/EditAddressData";
import { toast } from "sonner";
import { editAddress } from "../_actions/edit-address";

export const useEditAddress = (
  addressId: string,
  addressLabel: string,
  addressNumber: string,
  addressComplement?: string,
  addressReference?: string,
) => {
  const { data } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EditAddressFormData>({
    resolver: zodResolver(editAddressSchema),
    defaultValues: {
      label: addressLabel,
      number: addressNumber,
      complement: addressComplement ?? "",
      reference: addressReference ?? "",
    },
  });

  const number = watch("number");

  useEffect(() => {
    setValue("number", filterOnlyNumbers(number));
  }, [number, setValue]);

  const updateAddress = async (address: EditAddressFormData) => {
    if (!data?.user.id) return;

    const addressData: IEditAddressData = {
      id: addressId,
      label: address.label?.toLowerCase(),
      number: address.number,
      complement: address.complement?.toLowerCase(),
      reference: address.reference?.toLowerCase(),
    };

    try {
      setIsLoading(true);
      await editAddress(addressData);

      toast.success("Seus dados foram atualizados!", {
        description: "Endereço atualizado com sucesso!",
        position: "bottom-center",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Erro ao atualizar endereço, tente novamente!", {
        position: "bottom-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = (addressData: EditAddressFormData) =>
    updateAddress(addressData);

  return {
    register,
    handleSubmit,
    handleSubmitForm,
    isLoading,
    errors,
  };
};
