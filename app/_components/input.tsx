import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../_lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string;
  className?: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, className, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1">
        <label
          data-error={errors}
          className="text-nowrap text-sm font-semibold data-[error]:text-destructive sm:text-base"
        >
          {label}:
        </label>
        <input
          data-error={errors}
          className={cn(
            "w-full rounded border p-2 shadow-md outline-none focus:border-black disabled:cursor-not-allowed disabled:text-gray-500 data-[error]:border-destructive",
            className,
          )}
          ref={ref}
          {...props}
        />
        {errors && <p className="text-destructive">{errors}</p>}
      </div>
    );
  },
);

export default Input;
