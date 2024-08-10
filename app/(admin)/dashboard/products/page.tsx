"use client";

import ProductsList from "./_components/products-list";
import { useCallback, useEffect, useState } from "react";
import { IProduct } from "../../_interface/Products";
import { Category } from "@prisma/client";
import { getAllProducts } from "./_actions/fetch-products";
import { fetchAllCategories } from "../../_actions/category";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminProductPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 12;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const fetchProducts = useCallback(async () => {
    setIsLoadingNextPage(true);
    const { products, totalProducts } = await getAllProducts(
      page,
      pageSize,
      query,
    );

    setProducts(products);
    setTotalProducts(totalProducts);
    setIsLoadingNextPage(false);
  }, [page, pageSize, query]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetchAllCategories();

      setCategories(categories);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="p-8">
      <div className="max-h-[750px] overflow-y-auto rounded-md bg-gray-200 bg-opacity-90 p-8 shadow-lg lg:max-h-full lg:w-[800px] xl:w-full">
        <ProductsList
          products={products}
          categories={categories}
          totalProducts={totalProducts}
          query={query}
          setQuery={setQuery}
          revalidateProducts={fetchProducts}
        />
      </div>

      <div className="mt-10 flex justify-between px-3">
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={handlePrevPage}
          disabled={page === 1 || isLoadingNextPage}
        >
          <ChevronLeft />
          <span className="hidden sm:block">Anterior</span>
        </Button>
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={handleNextPage}
          disabled={page * pageSize >= totalProducts || isLoadingNextPage}
        >
          <span className="hidden sm:block">Próxima</span> <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default AdminProductPage;
