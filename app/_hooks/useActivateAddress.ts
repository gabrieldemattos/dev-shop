import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useState } from "react";
import { updatePrimaryAddress } from "../_actions/update-active-address";

export const useActivateAddress = (addressId: string) => {
  const { data } = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeAddressConfirmation = async () => {
    try {
      setIsLoading(true);
      await updatePrimaryAddress(data?.user.id, addressId);

      toast.success("Endereço principal alterado!", {
        position: "bottom-center",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao alterar o endereço principal.", {
        position: "bottom-center",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { activeAddressConfirmation, isLoading };
};
