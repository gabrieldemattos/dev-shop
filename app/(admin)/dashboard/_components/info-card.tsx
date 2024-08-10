import { cn } from "@/app/_lib/utils";

interface InfoCardProps {
  title: string;
  icon: JSX.Element;
  subtitle: string;
  value: number | string;
  className?: string;
}

const InfoCard = ({
  title,
  icon,
  subtitle,
  value,
  className,
}: InfoCardProps) => {
  return (
    <div
      className={cn(
        "border-xl flex w-full flex-col space-y-6 border bg-background p-5 shadow-md lg:col-span-2 xl:col-span-1",
        className,
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold">{title}</p>

          {icon}
        </div>

        <p className="lg:text-sm">{subtitle}</p>
      </div>

      <p className="text-lg font-bold sm:text-xl">{value}</p>
    </div>
  );
};

export default InfoCard;
