"use client";

import { FormEvent, useState } from "react";
import CategoriesList from "./_components/categories-list";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import Container from "../../_components/container";
import CreateNewCategory from "./_components/create-new-category";
import { usePaginatedCategories } from "./_hooks/usePaginatedCategories";

const AdminCategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [openAddCategory, setOpenAddCategory] = useState<boolean>(false);

  const handleOpenAddCategoryClick = () => setOpenAddCategory(true);
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const {
    categories,
    isLoading: isLoadingCategories,
    totalCategories,
    fetchCategories,
    revalidateCategories,
  } = usePaginatedCategories(page, query, 12);
  const isLoadingNextPage = isLoadingCategories;

  const handleSearchCategory = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchCategories();
  };

  return (
    <div className="p-8">
      <Container>
        <div className="flex flex-col space-y-2 py-2 md:space-y-0">
          <div className="flex flex-col justify-between space-y-3 md:flex-row md:space-y-0">
            <form
              onSubmit={handleSearchCategory}
              className="flex items-center gap-2 md:mb-6"
            >
              <input
                type="text"
                placeholder="Busque por nome, email ou número do pedido"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary md:min-w-fit lg:min-w-[400px]"
              />

              <Button
                type="submit"
                disabled={isLoadingNextPage || isLoadingCategories}
              >
                <Search />
              </Button>
            </form>

            <Button
              className="flex w-full items-center gap-2 px-4 py-2 uppercase text-white md:h-fit md:w-fit"
              onClick={handleOpenAddCategoryClick}
              disabled={isLoadingNextPage || isLoadingCategories}
            >
              <Plus />
              Adicionar Categoria
            </Button>
          </div>

          <h1 className="text-sm font-bold sm:text-xl">
            {totalCategories}{" "}
            {totalCategories === 1
              ? "Categoria encontrada"
              : "Categorias encontradas"}{" "}
            no total
          </h1>
        </div>

        {isLoadingCategories ? (
          <div className="flex h-96 items-center justify-center">
            <p className="font-bold">Carregando categorias...</p>
          </div>
        ) : (
          <CategoriesList
            categories={categories}
            revalidateCategories={fetchCategories}
          />
        )}
      </Container>

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
          disabled={page * 12 >= totalCategories || isLoadingNextPage}
        >
          <span className="hidden sm:block">Próxima</span> <ChevronRight />
        </Button>
      </div>

      <CreateNewCategory
        openAddCategory={openAddCategory}
        setOpenAddCategory={setOpenAddCategory}
        revalidateCategories={revalidateCategories}
      />
    </div>
  );
};

export default AdminCategoriesPage;
