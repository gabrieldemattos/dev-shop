interface AddressInfoParagraphProps {
  addressInfo: string;
  label: string;
  className?: string;
}

const AddressInfoParagraph = ({
  addressInfo,
  label,
  className,
}: AddressInfoParagraphProps) => {
  return (
    <p className={className}>
      {addressInfo}:{" "}
      <span className="font-semibold capitalize italic">{label}</span>
    </p>
  );
};

export default AddressInfoParagraph;
