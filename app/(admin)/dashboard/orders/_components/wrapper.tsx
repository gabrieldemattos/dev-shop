import { cn } from "@/app/_lib/utils";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

const Wrapper = ({ children, className }: WrapperProps) => {
  return (
    <div
      className={cn(
        "mb-6 space-y-1 rounded-lg border border-gray-200 bg-gray-50 p-3 shadow-sm md:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
