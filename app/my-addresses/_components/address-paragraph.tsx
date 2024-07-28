import { cn } from "@/app/_lib/utils";

interface AddressParagraphProps {
  label: string;
  content: string;
  className?: string;
}

const AddressParagraph = ({
  label,
  content,
  className,
}: AddressParagraphProps) => {
  return (
    <p className={cn("text-sm font-light text-muted-foreground", className)}>
      {label} <span className="font-bold italic">{content}</span>
    </p>
  );
};

export default AddressParagraph;
