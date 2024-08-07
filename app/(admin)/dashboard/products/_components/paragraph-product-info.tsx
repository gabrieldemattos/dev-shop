interface ParagraphProductInfoProps {
  icon: JSX.Element;
  label: string;
  text: string | number;
}

const ParagraphProductInfo = ({
  icon,
  label,
  text,
}: ParagraphProductInfoProps) => {
  return (
    <p className="mb-2 flex items-center gap-1 text-gray-700">
      <span className="flex items-center font-semibold">
        {icon} <span className="hidden lg:block">{label}:</span>{" "}
      </span>
      {text}
    </p>
  );
};

export default ParagraphProductInfo;
