import { Address } from "@prisma/client";
import AddressParagraph from "./address-paragraph";
import { formatPhoneNumber } from "@/app/_helpers/format-phone-number";

interface AddressDetailsProps {
  address: Address;
}

const AddressDetails = ({ address }: AddressDetailsProps) => {
  const telephoneNumber = `${address.telephoneDDD}${address.telephoneNumber}`;

  return (
    <div className="flex w-10/12 flex-col gap-1 px-5">
      <p className="text-lg font-semibold uppercase">{address.label}</p>

      <AddressParagraph
        label="Quem receberá:"
        content={`${address.firstName} ${address.lastName}`}
      />

      <AddressParagraph
        label="Endereço:"
        content={`${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state.toUpperCase()}`}
      />

      {address.reference && (
        <AddressParagraph
          label="Ponto de referência:"
          content={address.reference}
        />
      )}

      {address.complement && (
        <AddressParagraph label="Complemento:" content={address.complement} />
      )}

      <AddressParagraph
        label="Telefone para contato:"
        content={formatPhoneNumber(telephoneNumber)}
      />
    </div>
  );
};

export default AddressDetails;
