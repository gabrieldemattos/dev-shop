import { cn } from "../../_lib/utils";

interface TitleProps {
  icon?: JSX.Element;
  title: string;
  className?: string;
}

const Title = ({ icon, title, className }: TitleProps) => {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 rounded-full bg-background px-3 py-[5px] uppercase shadow-md lg:col-span-4",
        className,
      )}
    >
      {icon}
      <h2 className="font-bold">{title}</h2>
    </div>
  );
};

export default Title;
