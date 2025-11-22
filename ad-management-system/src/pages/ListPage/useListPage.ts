import { fetchPageAds } from "@/services/ads";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

export type Sort = "new" | "old" | "expensive" | "cheap" | "urgent";

const basePagination: Pagination = {
  currentPage: 0,
  totalPages: 0,
  totalItems: 0,
  itemsPerPage: 0,
};

export const useListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<Sort>("new");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const onStatus = (status: string) => {
    setStatus(status);
    setCurrentPage(1);
  };

  const onSort = (sort: Sort) => {
    setSort(sort);
    setCurrentPage(1);
  };

  const onSearch = (search: string) => {
    setSearch(search);
    setCurrentPage(1);
  };

  const onCategory = (category: string) => {
    setCategory(category);
    setCurrentPage(1);
  };

  const onResetFilters = () => {
    setSort("new");
    setSearch("");
    setCategory("");
    setCurrentPage(1);
    setMinPrice("");
    setMaxPrice("");
    setStatus("");
  };

  const onPriceChange = (minPrice: string, maxPrice: string) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setCurrentPage(1);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "ads",
      currentPage,
      sort,
      search,
      category,
      minPrice,
      maxPrice,
      status,
    ],
    queryFn: () =>
      fetchPageAds(currentPage, sort, search, category, minPrice, maxPrice, status),
  });

  return {
    ads: data?.ads || [],
    pagination: data?.pagination || basePagination,
    setCurrentPage,
    currentPage,
    sort,
    search,
    isLoading,
    onSort,
    onSearch,
    onCategory,
    category,
    onResetFilters,
    onPriceChange,
    minPrice,
    maxPrice,
    status,
    onStatus,
  };
};
