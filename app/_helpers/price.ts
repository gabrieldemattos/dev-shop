import { Product } from "@prisma/client";

export const calculateProductTotalPrice = (product: Product): number => {
  if (product.discountPercentage === 0) {
    return Number(product.basePrice);
  }

  const discount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return Number(product.basePrice) - discount;
};

export const formatCurrency = (value: number): string => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};
