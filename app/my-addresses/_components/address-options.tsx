"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from "@/app/_components/ui/sheet";
import { Check, EllipsisVertical, Pencil, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useActivateAddress } from "@/app/_hooks/useActivateAddress";
import EditAddress from "./edit-address";
import DeleteAddress from "./delete-address";
import { Address } from "@prisma/client";

interface AddressOptionsProps {
  address: Address;
}

const AddressOptions = ({ address }: AddressOptionsProps) => {
  const [openEditAddress, setOpenEditAddress] = useState<boolean>(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    useState<boolean>(false);

  const handleEditAddresClick = () => setOpenEditAddress(true);
  const handleDeleteAddressClick = () => setOpenDeleteConfirmation(true);

  const { activeAddressConfirmation, isLoading } = useActivateAddress(
    address.id,
  );

  return (
    <>
      <Sheet>
        <SheetTrigger disabled={isLoading}>
          <EllipsisVertical size={15} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle className="break-words text-center capitalize">
              {address.label}
            </SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col gap-1 capitalize">
              <p className="text-xs text-muted-foreground">
                {address.street}, {address.number} - {address.neighborhood},{" "}
                {address.city} -{" "}
                <span className="uppercase">{address.state}</span>
              </p>
            </div>

            <div className="flex w-full items-center justify-center gap-3">
              <SheetClose asChild>
                <Button variant="outline" onClick={handleEditAddresClick}>
                  <Pencil className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAddressClick}
                >
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  <span>Excluir</span>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button variant="outline" onClick={activeAddressConfirmation}>
                  <Check className="mr-2 h-4 w-4" />
                  <span>Tornar como Principal</span>
                </Button>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <EditAddress
        openEditAddress={openEditAddress}
        setOpenEditAddress={setOpenEditAddress}
        address={address}
      />

      <DeleteAddress
        addressId={address.id}
        addressName={address.label}
        openDeleteConfirmation={openDeleteConfirmation}
        setOpenDeleteConfirmation={setOpenDeleteConfirmation}
      />
    </>
  );
};

export default AddressOptions;
