import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";

interface MenuButtonProps {
  href: string;
  icon: JSX.Element;
  label: string;
  className?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
}

const MenuButton = ({
  href,
  icon,
  label,
  className,
  variant = "ghost",
}: MenuButtonProps) => {
  return (
    <Button
      className={cn(
        "w-full justify-start space-x-3 rounded-full text-sm",
        className,
      )}
      variant={variant}
      asChild
    >
      <Link href={href}>
        {icon}
        <span className="block capitalize">{label}</span>
      </Link>
    </Button>
  );
};

export default MenuButton;
