"use client";

import Filters from "@/app/_components/filters";
import ProductItem from "@/app/_components/product-item";
import { useFilters } from "@/app/_hooks/useFilter";
import { Product, UserFavoriteProduct } from "@prisma/client";

interface ProductsProps {
  userFavorites: UserFavoriteProduct[];
  category: string;
  orderedProducts: Product[];
}

const Products = ({
  userFavorites,
  category,
  orderedProducts,
}: ProductsProps) => {
  const { clearFilters, selectedFilter, handleFilterChange, filteredProducts } =
    useFilters({ initialProducts: orderedProducts });

  return (
    <div className="flex flex-col gap-4">
      <Filters
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={JSON.parse(
              JSON.stringify({ ...product, category: { slug: category } }),
            )}
            className="g min-w-full"
            userFavorites={userFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
