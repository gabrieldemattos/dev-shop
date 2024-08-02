"use client";

import Input from "@/app/_components/input";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { useEditAddress } from "@/app/(shop)/_hooks/useEditAddress";
import { Address } from "@prisma/client";
import { Loader2 } from "lucide-react";

interface EditAddressProps {
  openEditAddress: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpenEditAddress: (open: boolean) => void;
  address: Address;
}

const EditAddress = ({
  openEditAddress = false,
  setOpenEditAddress,
  address,
}: EditAddressProps) => {
  const { errors, handleSubmit, handleSubmitForm, isLoading, register } =
    useEditAddress(
      address.id,
      address.label,
      address.number,
      address.complement ?? "",
      address.reference ?? "",
    );

  return (
    <Dialog open={openEditAddress} onOpenChange={setOpenEditAddress}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="mb-5 text-center text-2xl">
            Editar Endereço
          </DialogTitle>

          <DialogDescription className="flex flex-col">
            <span className="text-lg font-semibold capitalize text-black">
              {address.street}, {address.number}
            </span>
            <span className="text-base capitalize text-muted-foreground">
              {address.neighborhood}, {address.city} -{" "}
              <span className="uppercase">{address.state}</span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="mb-5">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <Input
              label="Nome do Endereço"
              maxLength={90}
              disabled={isLoading}
              placeholder="Casa, Trabalho, Escola, etc.."
              {...register("label", { required: true })}
              errors={errors.label?.message}
            />

            <Input
              label="Número"
              maxLength={7}
              disabled={isLoading}
              placeholder="Ex: 123"
              {...register("number", { required: true })}
              errors={errors.number?.message}
            />

            <Input
              label="Complemento (opcional)"
              maxLength={30}
              disabled={isLoading}
              placeholder="Ex: Apto 1, Bloco B, etc.."
              {...register("complement", { required: true })}
              errors={errors.complement?.message}
            />

            <Input
              label="Ponto de Referência (opcional)"
              maxLength={140}
              disabled={isLoading}
              placeholder="Ex: Ao lado da praça, perto do supermercado, etc.."
              {...register("reference", { required: true })}
              errors={errors.reference?.message}
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAddress;
