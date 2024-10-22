"use client";

import { UserFavoriteProduct } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchProducts } from "../_actions/search";
import ProductItem from "@/app/(shop)/_components/product-item";
import { Frown } from "lucide-react";
import Header from "@/app/(shop)/_components/header";
import Loader from "@/app/(shop)/_components/loader";
import { IProductWithTotalReviews } from "@/app/(shop)/_interfaces/ProductWithTotalReviews";
import Filters from "@/app/(shop)/_components/filters";
import { useFilters } from "@/app/(shop)/_hooks/useFilter";

interface ProductProps {
  userFavorites: UserFavoriteProduct[];
}

const Products = ({ userFavorites }: ProductProps) => {
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("q");

  const [products, setProducts] = useState<IProductWithTotalReviews[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { filteredProducts, selectedFilter, handleFilterChange, clearFilters } =
    useFilters({ initialProducts: products });

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchFor) return;

      setIsLoading(true);
      try {
        const foundProducts = await searchProducts(searchFor);

        setProducts(foundProducts);
      } catch (error) {
        console.log(error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchFor]);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />

      <div className="mt-5 flex flex-col space-y-6 px-5 xl:px-20 2xl:px-64">
        <div className="flex flex-col gap-6">
          <h2 className="truncate text-xl text-foreground">
            Resultados para:{" "}
            <span className="font-bold text-foreground">{searchFor}</span>
          </h2>

          {products.length > 0 && (
            <p>
              Encontramos {products.length}{" "}
              {products.length === 1 ? "produto" : "produtos"}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Filters
            selectedFilter={selectedFilter}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
          />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductItem
                key={product.id}
                product={JSON.parse(JSON.stringify(product))}
                className="min-w-full"
                userFavorites={userFavorites}
              />
            ))}
          </div>
        </div>
      </div>

      {!isLoading && products.length === 0 && (
        <div className="mt-20 flex flex-col items-center gap-5 px-5">
          <p className="text-base font-bold">
            Não encontramos nenhum resultado para sua pesquisa!
          </p>

          <Frown size={150} className="text-gray-400 text-opacity-30" />
        </div>
      )}

      {isLoading && <Loader />}
    </>
  );
};

export default Products;
