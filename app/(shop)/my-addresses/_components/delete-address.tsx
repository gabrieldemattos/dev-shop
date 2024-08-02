import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { useDeleteAddress } from "@/app/(shop)/_hooks/useDeleteAddress";

interface DeleteAddressProps {
  addressId: string;
  addressName: string;
  openDeleteConfirmation: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenDeleteConfirmation: (open: boolean) => void;
}

const DeleteAddress = ({
  addressId,
  addressName,
  openDeleteConfirmation,
  setOpenDeleteConfirmation,
}: DeleteAddressProps) => {
  const { deleteAddressConfirmation, isLoading } = useDeleteAddress(addressId);

  return (
    <AlertDialog
      open={openDeleteConfirmation}
      onOpenChange={setOpenDeleteConfirmation}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir esse endereço?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a remover o endereço{" "}
            <span className="font-semibold uppercase text-black">
              {addressName}
            </span>
            . Esta ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={deleteAddressConfirmation}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAddress;
