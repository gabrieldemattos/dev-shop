"use client";

import { notFound, useSearchParams } from "next/navigation";
import Header from "../_components/header";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { searchProducts } from "./_actions/search";
import ProductItem from "../_components/product-item";
import { Frown, Loader2 } from "lucide-react";
import Loader from "../_components/loader";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchFor = searchParams.get("q");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchFor) return;

      setIsLoading(true);
      try {
        const foundProducts = await searchProducts(searchFor);

        setProducts(foundProducts);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [searchFor]);

  console.log(products);

  if (!searchFor) return notFound();

  return (
    <>
      <Header />

      <div className="mt-5 flex flex-col space-y-6 px-5">
        <h2 className="truncate text-xl text-foreground">
          Resultados para:{" "}
          <span className="font-bold text-foreground">{searchFor}</span>
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {!isLoading &&
            products.length > 0 &&
            products.map((product) => (
              <ProductItem
                key={product.id}
                product={JSON.parse(JSON.stringify(product))}
                className="min-w-full"
              />
            ))}
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

export default SearchPage;
