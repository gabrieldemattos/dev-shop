"use client";

import { Button } from "@/app/_components/ui/button";
import { useCartContext } from "@/app/(shop)/_hooks/useCartContext";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { searchProduct } from "../_actions/search-product";

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

  const handleAddToCartClick = async () => {
    const hasProduct = await searchProduct(product.id);

    if (!hasProduct || hasProduct.status === "INACTIVE")
      return toast.error(
        "Este produto não está mais disponível ou está fora de estoque. Não é possível concluir a compra.",
        {
          position: "bottom-center",
          duration: 3000,
        },
      );

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
