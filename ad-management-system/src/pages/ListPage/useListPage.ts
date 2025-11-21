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

  const onSort = (sort: Sort) => {
    setSort(sort);
    setCurrentPage(1);
  }

  const onSearch = (search: string) => {
    setSearch(search);
    setCurrentPage(1);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["ads", currentPage, sort, search],
    queryFn: () => fetchPageAds(currentPage, sort, search),
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
  };
};
