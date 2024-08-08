"use client";

import ProductsList from "./_components/products-list";
import { useEffect, useState } from "react";
import { IProduct } from "../../_interface/Products";
import { Category } from "@prisma/client";
import { getAllProducts } from "./_actions/fetch-products";
import { fetchAllCategories } from "../../_actions/category";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminProductPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [totalProducts, setTotalProducts] = useState(0);
  const pageSize = 10;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, totalProducts } = await getAllProducts(
        page,
        pageSize,
        query,
      );

      setProducts(products);
      setTotalProducts(totalProducts);
    };

    fetchProducts();
  }, [page, query]);

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
      <div className="max-h-[750px] overflow-y-auto rounded-md bg-gray-200 bg-opacity-90 p-8 shadow-lg lg:w-[800px] xl:w-full">
        <ProductsList
          products={products}
          categories={categories}
          query={query}
          setQuery={setQuery}
        />
      </div>

      <div className="mt-10 flex justify-between px-3">
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          <ChevronLeft />
          <span className="hidden sm:block">Anterior</span>
        </Button>
        <Button
          className="gap-2 bg-blue-500 hover:bg-blue-600"
          onClick={handleNextPage}
          disabled={page * pageSize >= totalProducts}
        >
          <span className="hidden sm:block">Próxima</span> <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default AdminProductPage;
