"use client";

import { Button } from "./ui/button";
import CartItem from "./cart-items";
import { useCartContext } from "../_hooks/useCartContext";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { formatCurrency } from "../_helpers/price";

const Cart = () => {
  const {
    products,
    totalDiscounts,
    totalPriceWithDiscounts,
    totalPriceWithoutDiscounts,
  } = useCartContext();

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="h-full flex-auto space-y-4 overflow-auto">
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalPriceWithoutDiscounts)}</span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Descontos</span>
                    <span>- {formatCurrency(totalDiscounts)}</span>
                  </div>

                  <Separator className="h-[0.5px]" />

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalPriceWithDiscounts)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="mt-6 w-full">Finalizar pedido</Button>
          </>
        ) : (
          <h2 className="mt-6 text-nowrap text-left font-medium">
            Seu carrinho de compras da DEVShop está vazio.
          </h2>
        )}
      </div>
    </>
  );
};

export default Cart;
