"use client";

import { useCallback, useEffect, useState } from "react";
import CategoriesList from "./_components/categories-list";
import { Category } from "@prisma/client";
import { fetchAllCategories } from "./_actions/fetch-categories";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [totalCategories, setTotalCategories] = useState(0);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(false);
  const pageSize = 10;

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const fetchCategories = useCallback(async () => {
    setIsLoadingNextPage(true);
    const { categories, totalCategories } = await fetchAllCategories(
      page,
      pageSize,
      query,
    );

    setCategories(categories);
    setTotalCategories(totalCategories);
    setIsLoadingNextPage(false);
  }, [page, pageSize, query]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="p-8">
      <div className="max-h-[750px] overflow-y-auto rounded-md bg-gray-200 bg-opacity-90 p-8 shadow-lg lg:w-[800px] xl:w-full">
        <CategoriesList
          categories={categories}
          totalCategories={totalCategories}
          query={query}
          setQuery={setQuery}
          revalidateCategories={fetchCategories}
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
          disabled={page * pageSize >= totalCategories || isLoadingNextPage}
        >
          <span className="hidden sm:block">Próxima</span> <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
