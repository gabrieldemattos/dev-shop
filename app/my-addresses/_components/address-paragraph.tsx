interface AddressParagraphProps {
  label: string;
  content: string;
}

const AddressParagraph = ({ label, content }: AddressParagraphProps) => {
  return (
    <p className="text-sm font-light text-muted-foreground">
      {label} <span className="font-bold italic">{content}</span>
    </p>
  );
};

export default AddressParagraph;
