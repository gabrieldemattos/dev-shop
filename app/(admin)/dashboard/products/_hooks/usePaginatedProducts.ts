"use client";

import { useState, useEffect, useCallback } from "react";
import { IProduct } from "../../../_interface/Products";
import { getAllProducts } from "../_actions/fetch-products";

export const usePaginatedProducts = (
  page: number,
  query: string,
  pageSize: number,
) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    setIsLoading(true);
    const { products, totalProducts } = await getAllProducts(
      page,
      pageSize,
      query,
    );
    setProducts(products);
    setTotalProducts(totalProducts);
    setIsLoading(false);
  };

  const revalidateFetchProducts = useCallback(async () => {
    fetchProducts();
  }, [page, pageSize]);

  useEffect(() => {
    revalidateFetchProducts();
  }, [revalidateFetchProducts]);

  return {
    products,
    isLoading,
    totalProducts,
    fetchProducts,
    revalidateFetchProducts,
  };
};
