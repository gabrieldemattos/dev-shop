import { filteredBy } from "../_helpers/filteredBy";
import { useState, useEffect } from "react";
import { Product } from "@prisma/client";

interface UseFiltersProps {
  initialProducts: Product[];
}

export const useFilters = ({ initialProducts }: UseFiltersProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [selectedFilter, setSelectedFilter] = useState<string>("empty");

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    setFilteredProducts(filteredBy(selectedFilter, products));
  }, [selectedFilter, products]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const clearFilters = () => {
    setSelectedFilter("empty");
  };

  return {
    filteredProducts,
    selectedFilter,
    handleFilterChange,
    clearFilters,
  };
};
