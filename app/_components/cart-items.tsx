"use client";

import Image from "next/image";
import React, { memo } from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { useCartContext } from "../_hooks/useCartContext";
import { ICartProduct } from "../_interfaces/CartProduct";

interface CartItemProps {
  product: ICartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    incrementQuantity,
    decrementQuantity,
    deleteProductFromCart,
    totalPriceWithDiscounts,
    totalPriceWithoutDiscounts,
    totalDiscounts,
  } = useCartContext();

  console.log({
    desconto: formatCurrency(totalPriceWithDiscounts),
    semDesconto: formatCurrency(totalPriceWithoutDiscounts),
    totalDesconto: formatCurrency(totalDiscounts),
  });

  const handleIncrementQuantityClick = () => incrementQuantity(product.id);

  const handleDecrementQuantityClick = () => decrementQuantity(product.id);

  const handleDeleteProductClick = () => deleteProductFromCart(product.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            fill
            sizes="100%"
            className="rounded-lg bg-background object-contain"
          />
        </div>

        <div className="w-[180px] space-y-1">
          <h3 className="truncate text-sm">{product.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold text-red-600">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h4>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-gray-400 line-through">
                {formatCurrency(Number(product.basePrice))}
              </span>
            )}
          </div>

          <div className="flex items-center text-center">
            <Button
              size="icon"
              className="h-7 w-7 shadow"
              disabled={product.quantity === 1}
              variant="default"
              onClick={handleDecrementQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <p className="block w-8 text-xs">{product.quantity}</p>

            <Button
              size="icon"
              className="h-7 w-7 shadow"
              variant="default"
              onClick={handleIncrementQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="destructive"
        className="h-8 w-8 shadow"
        onClick={handleDeleteProductClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default memo(CartItem, (prev, next) => {
  return prev.product.quantity === next.product.quantity;
});
