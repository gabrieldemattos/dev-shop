"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface AddProductToCartProps {
  product: Product;
}

const AddProductToCart = ({ product }: AddProductToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncreaseQuantityClick = () => setQuantity((prev) => prev + 1);

  const handleDecreaseQuantityClick = () =>
    setQuantity((prev) => (prev === 1 ? prev : prev - 1));

  const handleAddToCartClick = () => console.log({ ...product, quantity });

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

      <div className="mt-6">
        <Button
          className="w-full font-semibold uppercase shadow-md"
          onClick={handleAddToCartClick}
        >
          Adicionar à sacola
        </Button>
      </div>
    </div>
  );
};

export default AddProductToCart;
