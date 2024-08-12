"use client";

import ProductsList from "./_components/products-list";
import { FormEvent, useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import Container from "../../_components/container";
import CreateNewProduct from "./_components/create-new-product";
import { usePaginatedProducts } from "./_hooks/usePaginatedProducts";
import { useProductCategories } from "./_hooks/useProductCategories";

const AdminProductPage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);

  const {
    products,
    isLoading: isLoadingProducts,
    totalProducts,
    fetchProducts,
    revalidateFetchProducts,
  } = usePaginatedProducts(page, query, 12);
  const categories = useProductCategories();
  const isLoadingNextPage = isLoadingProducts;

  const handleOpenAddProductClick = () => setOpenAddProduct(true);
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleSearchProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetchProducts();
  };

  return (
    <div className="p-8">
      <Container>
        <div className="flex flex-col space-y-2 py-2 md:space-y-0">
          <div className="flex flex-col justify-between space-y-3 md:flex-row md:space-y-0">
            <form
              onSubmit={handleSearchProduct}
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
                disabled={isLoadingNextPage || isLoadingProducts}
              >
                <Search />
              </Button>
            </form>

            <Button
              className="flex w-full items-center gap-2 px-4 py-2 uppercase text-white md:h-fit md:w-fit"
              onClick={handleOpenAddProductClick}
              disabled={isLoadingNextPage || isLoadingProducts}
            >
              <Plus />
              Adicionar Produto
            </Button>
          </div>

          <h1 className="text-sm font-bold sm:text-xl">
            {totalProducts}{" "}
            {totalProducts === 1
              ? "Produto encontrado"
              : "Produtos encontrados"}{" "}
            no total
          </h1>
        </div>

        {isLoadingProducts ? (
          <div className="flex h-96 items-center justify-center">
            <p className="font-bold">Carregando produtos...</p>
          </div>
        ) : (
          <ProductsList
            products={products}
            categories={categories}
            revalidateProducts={revalidateFetchProducts}
          />
        )}
      </Container>

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
          disabled={page * 12 >= totalProducts || isLoadingNextPage}
        >
          <span className="hidden sm:block">Próxima</span> <ChevronRight />
        </Button>
      </div>

      <CreateNewProduct
        openAddProduct={openAddProduct}
        setOpenAddProduct={setOpenAddProduct}
        categories={categories}
        revalidateProducts={fetchProducts}
      />
    </div>
  );
};

export default AdminProductPage;
