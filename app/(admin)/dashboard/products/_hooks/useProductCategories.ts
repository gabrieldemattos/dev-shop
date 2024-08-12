"use client";

import { useState, useEffect } from "react";
import { Category } from "@prisma/client";
import { fetchAllCategories } from "../../../_actions/category";

export const useProductCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await fetchAllCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return categories;
};
