"use client";

import { Button } from "@/app/_components/ui/button";
import { useCartContext } from "@/app/(shop)/_hooks/useCartContext";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";

interface BuyAgainButtonProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>;
  quantity: number;
}

const BuyAgainButton = ({ product, quantity }: BuyAgainButtonProps) => {
  const { addProductToCart } = useCartContext();

  const handleAddToCartClick = () => {
    addProductToCart({
      product: { ...product, quantity, categorySlug: product.category.slug },
    });

    toast.success("O item foi adicionado ao carrinho!", {
      position: "bottom-center",
      duration: 3000,
    });
  };

  return (
    <Button
      variant="outline"
      className="h-0 p-3 text-xs"
      onClick={handleAddToCartClick}
    >
      Comprar Novamente
    </Button>
  );
};

export default BuyAgainButton;
