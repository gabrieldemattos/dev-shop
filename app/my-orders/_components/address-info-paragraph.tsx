interface AddressInfoParagraphProps {
  addressInfo: string;
  label: string;
}

const AddressInfoParagraph = ({
  addressInfo,
  label,
}: AddressInfoParagraphProps) => {
  return (
    <p>
      {addressInfo}:{" "}
      <span className="font-semibold capitalize italic">{label}</span>
    </p>
  );
};

export default AddressInfoParagraph;
