import { Address } from "@prisma/client";
import AddressParagraph from "./address-paragraph";
import { formatPhoneNumber } from "@/app/(shop)/_helpers/format-phone-number";

interface AddressDetailsProps {
  address: Address;
}

const AddressDetails = ({ address }: AddressDetailsProps) => {
  return (
    <div className="flex w-10/12 flex-col gap-1 px-5">
      <p className="w-72 truncate text-lg font-semibold uppercase">
        {address.label}
      </p>

      <AddressParagraph
        label="Quem receberá:"
        content={`${address.firstName} ${address.lastName}`}
        className="truncate"
      />

      <AddressParagraph
        label="Endereço:"
        content={`${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state.toUpperCase()}`}
      />

      {address.reference && (
        <AddressParagraph
          label="Ponto de referência:"
          content={address.reference}
          className="truncate"
        />
      )}

      {address.complement && (
        <AddressParagraph label="Complemento:" content={address.complement} />
      )}

      <AddressParagraph
        label="Telefone para contato:"
        content={formatPhoneNumber(
          address.telephoneDDD,
          address.telephoneNumber,
        )}
      />
    </div>
  );
};

export default AddressDetails;
