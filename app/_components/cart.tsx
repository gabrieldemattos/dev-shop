"use client";

import { Button } from "./ui/button";
import CartItem from "./cart-items";
import { useCartContext } from "../_hooks/useCartContext";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { formatCurrency } from "../_helpers/price";
import { Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { createOrder } from "../_actions/order";
import { toast } from "sonner";

interface CartProps {
  setIsOpen: (isOpen: boolean) => void;
}

const Cart = ({ setIsOpen }: CartProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const {
    products,
    totalDiscounts,
    totalPriceWithDiscounts,
    totalPriceWithoutDiscounts,
    clearCart,
  } = useCartContext();

  const { data } = useSession();

  const router = useRouter();

  const handleFinishOrderClick = async () => {
    if (!data?.user) return router.push("/login");

    if (products.length === 0) return;

    try {
      setIsSubmitLoading(true);

      await createOrder({
        user: {
          connect: {
            id: data.user.id,
          },
        },
        products: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              basePrice: product.basePrice,
              discountPercentage: product.discountPercentage,
              quantity: product.quantity,
            })),
          },
        },
        totalPrice: totalPriceWithDiscounts,
        subtotalPrice: totalPriceWithoutDiscounts,
        deliveryFee: 0,
        discountValue: totalDiscounts,
        status: "WAITING_FOR_PAYMENT",
      });

      clearCart();
      setIsOpen(false);

      toast("Pedido finalizado com sucesso!", {
        description: "Você pode acompanhá-lo na tela dos seus pedidos.",
        position: "bottom-center",
        duration: 3000,
        action: {
          label: "Ver pedidos",
          onClick: () => router.push("/my-orders"),
        },
      });
    } catch (error) {
      toast.error("Erro ao finalizar o pedido, tente novamente!");
    } finally {
      setIsSubmitLoading(false);
    }
  };

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

            <Button
              className="mt-6 w-full gap-1 uppercase"
              disabled={isSubmitLoading}
              onClick={handleFinishOrderClick}
            >
              {isSubmitLoading ? (
                <>
                  <Loader2 className="ml-2 animate-spin" size={20} />
                  Finalizando pedido
                </>
              ) : (
                "Finalizar pedido"
              )}
            </Button>
          </>
        ) : (
          <div className="mt-20 flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full bg-gray-200 p-5">
              <ShoppingCart size={29} className="fill-red-500 stroke-red-500" />
            </div>

            <p className="mt-6 text-nowrap text-2xl font-medium">
              Seu carrinho está vazio
            </p>

            <div className="py-3">
              <p className="text-center text-sm">
                São milhares de produtos para você escolher
              </p>

              <p className="text-center text-sm">
                Escolha seus produtos e adicione em seu carrinho
              </p>
            </div>

            <Button className="mt-2 uppercase" onClick={() => router.push("/")}>
              Comece a comprar agora
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
