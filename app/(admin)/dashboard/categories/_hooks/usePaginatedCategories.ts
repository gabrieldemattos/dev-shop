"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchAllCategories } from "../_actions/fetch-categories";
import { Category } from "@prisma/client";

export const usePaginatedCategories = (
  page: number,
  query: string,
  pageSize: number,
) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCategories, setTotalCategories] = useState(0);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { categories, totalCategories } = await fetchAllCategories(
      page,
      pageSize,
      query,
    );
    setCategories(categories);
    setTotalCategories(totalCategories);
    setIsLoading(false);
  };

  const revalidateCategories = useCallback(async () => {
    fetchCategories();
  }, [page, pageSize]);

  useEffect(() => {
    revalidateCategories();
  }, [revalidateCategories]);

  return {
    categories,
    isLoading,
    totalCategories,
    fetchCategories,
    revalidateCategories,
  };
};
