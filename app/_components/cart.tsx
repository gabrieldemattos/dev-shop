"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { ShoppingCartIcon } from "lucide-react";
import CartItem from "./cart-items";
import { useCartContext } from "../_hooks/useCartContext";

const Cart = () => {
  const { products, totalProducts } = useCartContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent text-white hover:bg-transparent"
          >
            <ShoppingCartIcon />
          </Button>

          {totalProducts > 0 && (
            <span className="absolute bottom-0 right-0 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-foreground font-bold text-background">
              {totalProducts}
            </span>
          )}
        </div>
      </SheetTrigger>

      <SheetContent side="right" className="w-[80vw] bg-[#f3f3f3]">
        <SheetHeader className="text-left">
          <SheetTitle>Meu Carrinho</SheetTitle>
        </SheetHeader>

        {products.length > 0 && (
          <div className="space-y-4 py-5">
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
