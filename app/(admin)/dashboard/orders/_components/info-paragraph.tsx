import { cn } from "@/app/_lib/utils";

interface InfoParagraphProps {
  label: string;
  content: string | number;
  className?: string;
}

const InfoParagraph = ({ label, content, className }: InfoParagraphProps) => {
  return (
    <p className={cn("flex flex-col text-gray-600 md:block", className)}>
      <strong>{label}:</strong> {content}
    </p>
  );
};

export default InfoParagraph;
