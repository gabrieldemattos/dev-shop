import { Product } from "@prisma/client";

export const filteredBy = (filter: string, products: Product[]) => {
  const copyProducts = [...products];

  switch (filter) {
    case "Melhores Avaliados":
      return copyProducts.toSorted(
        (a, b) => Number(b.averageRating) - Number(a.averageRating),
      );
    case "Maior Desconto":
      return copyProducts.toSorted(
        (a, b) => b.discountPercentage - a.discountPercentage,
      );
    case "Menor Preço":
      return copyProducts.toSorted(
        (a, b) => Number(a.basePrice) - Number(b.basePrice),
      );
    case "Maior Preço":
      return copyProducts.toSorted(
        (a, b) => Number(b.basePrice) - Number(a.basePrice),
      );
    default:
      return products;
  }
};
