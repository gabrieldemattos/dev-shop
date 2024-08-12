"use client";

import { Category } from "@prisma/client";
import ProductCard from "./product-card";
import { IProduct } from "@/app/(admin)/_interface/Products";

interface ProductsListProps {
  products: IProduct[];
  categories: Category[];
  revalidateProducts: () => void;
}

const ProductsList = ({
  products,
  categories,
  revalidateProducts,
}: ProductsListProps) => {
  return (
    <div className="container mx-auto px-0 py-3 pb-8 md:px-4">
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
    </div>
  );
};

export default ProductsList;
