"use client";

import Header from "@/app/_components/header";
import Input from "@/app/_components/input";
import { Button } from "@/app/_components/ui/button";
import { ArrowLeft, Contact, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRegisterNewAddress } from "@/app/_hooks/useRegisterNewAddress";

const NewAddressPage = () => {
  const { data } = useSession();

  const {
    register,
    handleSubmit,
    handleSubmitAdressForm,
    getValues,
    postalCode,
    isValidPostalCode,
    isLoading,
    errors,
  } = useRegisterNewAddress();

  if (!data) return redirect("/login");

  return (
    <>
      <Header />

      <div className="mt-8 flex items-center justify-between px-8">
        <div className="flex items-center gap-2">
          <Contact size={25} />
          <h2 className="font-bold uppercase">Cadastrar novo endereço</h2>
        </div>

        <Button
          className="gap-2 hover:bg-transparent hover:underline"
          variant="ghost"
          disabled={isLoading}
          asChild
        >
          <Link href="/my-addresses">
            <ArrowLeft size={25} />
            Voltar
          </Link>
        </Button>
      </div>

      <form
        className="flex flex-col gap-4 p-8"
        onSubmit={handleSubmit(handleSubmitAdressForm)}
      >
        <Input
          label="Nome do Endereço"
          maxLength={90}
          placeholder="Casa, Trabalho, Escola, etc.."
          {...register("label")}
          errors={errors?.label?.message}
          disabled={isLoading}
        />

        <div className="flex gap-2">
          <Input
            label="Nome"
            placeholder="Digite seu nome"
            {...register("firstName")}
            errors={errors?.firstName?.message}
            disabled={isLoading}
          />
          <Input
            label="Sobrenome"
            placeholder="Digite seu sobrenome"
            {...register("lastName")}
            errors={errors?.lastName?.message}
            disabled={isLoading}
          />
        </div>

        <Input
          label="CEP"
          maxLength={8}
          placeholder="Ex: 12345678"
          {...register("postalCode")}
          errors={errors?.postalCode?.message}
          disabled={isLoading}
        />

        <div className="flex gap-2">
          <Input
            label="Rua"
            maxLength={90}
            placeholder="Rua, Avenida, etc.."
            {...register("street")}
            errors={errors?.street?.message}
            disabled={
              isLoading ||
              (getValues("street")?.length > 0 &&
                postalCode?.length === 8 &&
                isValidPostalCode)
            }
          />

          <div className="w-[350px]">
            <Input
              label="Número"
              maxLength={7}
              placeholder="Número da Residência"
              {...register("number")}
              errors={errors?.number?.message}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            label="Bairro"
            maxLength={60}
            placeholder="Bairro, Rodovia, etc.."
            {...register("neighborhood")}
            errors={errors?.neighborhood?.message}
            disabled={
              isLoading ||
              (getValues("neighborhood")?.length > 0 &&
                postalCode?.length === 8 &&
                isValidPostalCode)
            }
          />

          <Input
            label="Complemento (opcional)"
            maxLength={30}
            placeholder="Ex: Apto 1, Bloco B, etc.."
            {...register("complement")}
            errors={errors?.complement?.message}
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-2">
          <Input
            label="Cidade"
            maxLength={90}
            placeholder="Cidade em que reside"
            {...register("city")}
            errors={errors?.city?.message}
            disabled={
              isLoading ||
              (getValues("city")?.length > 0 &&
                postalCode?.length === 8 &&
                isValidPostalCode)
            }
          />

          <Input
            className="uppercase"
            label="Estado"
            maxLength={2}
            placeholder="Estado em que reside"
            {...register("state")}
            errors={errors?.state?.message}
            disabled={
              isLoading ||
              (getValues("state")?.length > 0 &&
                postalCode?.length === 8 &&
                isValidPostalCode)
            }
          />
        </div>

        <Input
          label="Ponto de Referência (opcional)"
          maxLength={140}
          placeholder="Ex: Ao lado da praça, perto do supermercado, etc.."
          {...register("reference")}
          errors={errors?.reference?.message}
          disabled={isLoading}
        />

        <div className="flex gap-2">
          <div className="w-fit">
            <Input
              label="DDD"
              placeholder="Ex: 11"
              maxLength={2}
              {...register("ddd")}
              errors={errors?.ddd?.message}
              disabled={isLoading}
            />
          </div>

          <Input
            label="Telefone para contato"
            placeholder="Ex: 999999999"
            maxLength={9}
            {...register("telephone")}
            errors={errors?.telephone?.message}
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="mt-5 uppercase" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Cadastrar endereço
        </Button>
      </form>
    </>
  );
};

export default NewAddressPage;
