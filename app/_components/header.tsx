import { MenuIcon, ShoppingCartIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import Search from "./search";
import Link from "next/link";

const Header = () => {
  return (
    <div className="bg-linear-primary px-8 py-3">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="border-none bg-transparent text-white hover:bg-transparent"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Link href="/">
            <p className="text-2xl font-bold text-red-700 text-opacity-70">
              DEV<span className="text-white">Shop</span>
            </p>
          </Link>

          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent text-white hover:bg-transparent"
          >
            <ShoppingCartIcon />
          </Button>
        </div>

        <Search />
      </div>
    </div>
  );
};

export default Header;
