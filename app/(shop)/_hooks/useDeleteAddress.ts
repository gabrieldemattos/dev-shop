import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { deleteAddress } from "../_actions/delete-address";

export const useDeleteAddress = (addressId: string) => {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteAddressConfirmation = async () => {
    if (!data?.user.id) return;

    try {
      setIsLoading(true);
      await deleteAddress(addressId);

      toast.success("O endereço foi excluído com sucesso!", {
        position: "bottom-center",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Erro ao excluir o endereço, tente novamente!", {
        position: "bottom-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteAddressConfirmation, isLoading };
};
