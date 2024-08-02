"use client";

import { useCartContext } from "@/app/(shop)/_hooks/useCartContext";
import { Button } from "@/app/_components/ui/button";
import { Prisma } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AddProductToCartProps {
  product: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
        };
      };
    };
  }>;
}

const AddProductToCart = ({ product }: AddProductToCartProps) => {
  const { addProductToCart } = useCartContext();

  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));

  const handleAddToCartClick = () => {
    addProductToCart({
      product: { ...product, quantity, categorySlug: product.category.slug },
    });

    toast.success("Produto adicionado ao carrinho!", {
      position: "bottom-center",
      duration: 3000,
    });
  };

  const handleBuyNowClick = () => {
    addProductToCart({
      product: { ...product, quantity, categorySlug: product.category.slug },
    });

    return router.push("/order-confirmation");
  };

  return (
    <div>
      <div className="flex items-center gap-2 text-center">
        <Button
          disabled={quantity === 1}
          size="icon"
          variant="default"
          className="shadow"
          onClick={handleDecreaseQuantityClick}
        >
          <ChevronLeft />
        </Button>

        <span className="w-5 font-semibold">{quantity}</span>

        <Button
          size="icon"
          variant="default"
          className="shadow"
          onClick={handleIncreaseQuantityClick}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="mt-6 space-y-2 lg:flex lg:items-center lg:gap-5 lg:space-y-0">
        <Button
          className="w-full font-semibold uppercase shadow-md"
          onClick={handleAddToCartClick}
        >
          Adicionar ao carrinho
        </Button>

        <Button
          className="w-full font-semibold uppercase shadow-md"
          onClick={handleBuyNowClick}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default AddProductToCart;
