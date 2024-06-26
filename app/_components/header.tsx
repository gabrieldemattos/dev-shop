"use client";

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
import Cart from "./cart";
import { useCartContext } from "../_hooks/useCartContext";
import { useState } from "react";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { totalProducts } = useCartContext();

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

          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <Button
              size="icon"
              variant="outline"
              className="border-none bg-transparent text-white hover:bg-transparent"
            >
              <ShoppingCartIcon />
            </Button>

            {totalProducts > 0 && (
              <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-foreground p-1 text-xs font-bold text-background">
                {totalProducts}
              </span>
            )}
          </div>
        </div>

        <Search />
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[80vw] bg-[#f3f3f3]" side="right">
          <SheetHeader>
            <SheetTitle className="text-left">Meu Carrinho</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
