"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Category } from "@prisma/client";
import ProductCard from "./product-card";
import { Plus } from "lucide-react";
import CreateNewProduct from "./create-new-product";
import { IProduct } from "@/app/(admin)/_interface/Products";

interface ProductsListProps {
  products: IProduct[];
  categories: Category[];
  totalProducts: number;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  revalidateProducts: () => void;
}

const ProductsList = ({
  products,
  categories,
  totalProducts,
  query,
  setQuery,
  revalidateProducts,
}: ProductsListProps) => {
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);

  const handleOpenAddProductClick = () => setOpenAddProduct(true);

  return (
    <div className="container mx-auto px-0 py-3 pb-8 md:px-4">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Buscar produto..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary md:w-1/2"
        />

        <button
          className="flex w-full items-center gap-2 rounded bg-primary px-4 py-2 uppercase text-white md:w-fit"
          onClick={handleOpenAddProductClick}
        >
          <Plus />
          Adicionar Produto
        </button>
      </div>

      <h1 className="py-3 pl-3 text-sm font-bold sm:text-xl">
        {totalProducts}{" "}
        {totalProducts === 1 ? "Produto encontrado" : "Produtos encontrados"} no
        total
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={JSON.parse(JSON.stringify(product))}
            categories={categories}
            revalidateProducts={revalidateProducts}
          />
        ))}
      </div>

      <CreateNewProduct
        openAddProduct={openAddProduct}
        setOpenAddProduct={setOpenAddProduct}
        categories={categories}
        revalidateProducts={revalidateProducts}
      />
    </div>
  );
};

export default ProductsList;
