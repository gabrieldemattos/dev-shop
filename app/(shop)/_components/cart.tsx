"use client";

import { Button } from "@/app/_components/ui/button";
import CartItem from "./cart-items";
import { useCartContext } from "../_hooks/useCartContext";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Separator } from "@/app/_components/ui/separator";
import { formatCurrency } from "../_helpers/price";
import { Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog";
import Link from "next/link";

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

  const router = useRouter();

  const handleClearCartClick = () => {
    setIsSubmitLoading(true);
    clearCart();

    if (products.length === 0) {
      setIsSubmitLoading(false);

      toast("Carrinho limpo com sucesso!", {
        position: "bottom-center",
        duration: 3000,
      });
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

                  <Separator />

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Entrega</span>
                    <span className="uppercase">Grátis</span>
                  </div>

                  <Separator />

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
              asChild
            >
              <Link href={"/order-confirmation"}>Revisar Pedido</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="my-2 w-full gap-1 uppercase"
                  disabled={isSubmitLoading}
                  variant="destructive"
                >
                  {isSubmitLoading && (
                    <Loader2 className="ml-2 animate-spin" size={20} />
                  )}
                  Limpar carrinho
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja realmente limpar o carrinho?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Todos os itens adicionados serão removidos permanentemente.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearCartClick}>
                    Limpar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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

            <Button
              className="mt-2 uppercase"
              onClick={() => {
                router.push("/");
                setIsOpen(false);
              }}
            >
              Comece a comprar agora
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
