"use client";

import { useState } from "react";
import { Category, Prisma } from "@prisma/client";
import ProductCard from "./product-card";
import { Plus } from "lucide-react";
import CreateNewProduct from "./create-new-product";

interface ProductsListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      category: {
        select: {
          slug: true;
          name: true;
        };
      };
      _count: {
        select: {
          reviews: true;
          orderProduct: true;
          usersWhoFavorited: true;
        };
      };
    };
  }>[];
  categories: Category[];
}

const ProductsList = ({ products, categories }: ProductsListProps) => {
  const [query, setQuery] = useState<string>("");
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);

  const handleOpenAddProductClick = () => setOpenAddProduct(true);

  const filteredProducts =
    query.length > 0
      ? products.filter((product) =>
          product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
        )
      : products;

  return (
    <div className="container mx-auto px-0 py-8 md:px-4">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={JSON.parse(JSON.stringify(product))}
          />
        ))}
      </div>

      <CreateNewProduct
        openAddProduct={openAddProduct}
        setOpenAddProduct={setOpenAddProduct}
        categories={categories}
      />
    </div>
  );
};

export default ProductsList;
