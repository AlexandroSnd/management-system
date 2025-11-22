import { SelectSort } from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { actions, CATEGORIES, STATUSES } from "@/constants/app";
import { AppRoutes } from "@/constants/routes";
import { formatTimestamp } from "@/lib/formatTimestamp";
import type { Ad } from "@/types/types";
import { Link } from "react-router-dom";
import { useListPage, type Sort } from "./useListPage";

export const ListPage = () => {
  const {
    ads,
    pagination,
    setCurrentPage,
    currentPage,
    sort,
    onSort,
    search,
    onSearch,
    isLoading,
    onCategory,
    category: activeCategory,
    onResetFilters,
    onPriceChange,
    minPrice,
    maxPrice,
    onStatus,
    status: activeStatus,
  } = useListPage();

  const pages = Array(pagination.totalPages).fill(null);

  return (
    <div className="flex flex-col gap-10 w-[1000px] relative">
      <Link to={AppRoutes.STATS}>
        <div className="absolute top-0 right-0 p-2 border rounded-2xl bg-[rgb(71,71,71)] cursor-pointer">
          Профиль
        </div>
      </Link>
      <div className="flex flex-col gap-5 mt-15">
        <div className="flex gap-4">
          <Input
            placeholder="Поиск..."
            onChange={(e) => onSearch(e.target.value)}
            value={search}
          />
          <SelectSort
            onChange={(value) => onSort(value as Sort)}
            value={sort}
          />
        </div>
        <div className="flex gap-4 mt-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => onCategory(category)}
              className={`p-2 border rounded-2xl ${
                category === activeCategory ? "bg-purple-600 text-white" : ""
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
        <div className="flex gap-4">
          {STATUSES.map((status) => (
            <Button
              key={status}
              onClick={() => onStatus(status)}
              className={`p-2 border rounded-2xl ${
                status === activeStatus ? "bg-purple-600 text-white" : ""
              }`}
            >
              {actions[status]}
            </Button>
          ))}
        </div>
        <div className="flex w-[50%] gap-4">
          <Input
            placeholder="Минимальная цена"
            onChange={(e) => onPriceChange(e.target.value, maxPrice)}
            value={minPrice}
          />
          <Input
            placeholder="Максимальная цена"
            onChange={(e) => onPriceChange(minPrice, e.target.value)}
            value={maxPrice}
          />
        </div>
        <div>
          <Button onClick={onResetFilters}>Сбросить фильтры</Button>
        </div>
      </div>

      <ul className="flex flex-col gap-7">
        {!isLoading &&
          ads.map((ad: Ad) => (
            <li key={ad.id} className="w-[1000px]">
              <Card key={ad.id} className="flex flex-row gap-10 p-10">
                <img
                  className="w-48 h-48 object-cover rounded-lg"
                  src={ad.images[0]}
                  alt={ad.title}
                />
                <div className="flex flex-col items-start gap-2 text-lg">
                  <h3 className="font-bold">{ad.title}</h3>
                  <p className="">{ad.price} ₽</p>
                  <div className="flex flex-col items-start gap-2 text-lg">
                    <p>{ad.category}</p>
                    <p>{formatTimestamp(ad.createdAt)}</p>
                  </div>
                  <Link to={`/ads/${ad.id}`}>
                    <Button>Открыть →</Button>
                  </Link>
                </div>
                <div className="flex flex-col items-end gap-2 text-lg ml-auto">
                  <span className="p-2 border rounded-2xl">
                    {actions[ad.priority]}
                  </span>
                  <span className="p-2 border rounded-2xl">
                    {actions[ad.status]}
                  </span>
                </div>
              </Card>
            </li>
          ))}
      </ul>
      <div className="flex gap-2 w-full items-center justify-center mt-4 text-lg flex-wrap">
        {pages.map((_, index) => (
          <span
            className={`w-10 cursor-pointer border rounded-full border-gray-300 p-2 hover:bg-purple-600 hover:border-purple-600 ${
              currentPage === index + 1 ? "bg-purple-600 text-white" : ""
            }`}
            key={index}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <p className="mt-10 text-3xl">Всего {pagination.totalItems} объявлений</p>
    </div>
  );
};
