import StatsPieChart from "@/components/PieChart/PieChart";
import SimpleBarChart from "@/components/SimpleBarChart/SimpleBarChart";
import { CATEGORY_COLOR_MAPPING } from "@/constants/app";
import { Link } from "react-router-dom";
import { formatReviewTime, useStatsData } from "./useStatsData";
import { AppRoutes } from "@/constants/routes";

export const StatsPage = () => {
  const { data, isLoading } = useStatsData("pie");
  const { data: barData } = useStatsData("bar");
  const { data: secondPieData } = useStatsData("pie2");
  const chartData = [
    {
      name: "Одобренные",
      value: Number(data?.approvedPercentage.toFixed()) || 0,
      color: "#82ca9d",
    },
    {
      name: "Отклоненные",
      value: Number(data?.rejectedPercentage.toFixed()) || 0,
      color: "#8884d8",
    },
    {
      name: "С запросом изменений",
      value: Number(data?.requestChangesPercentage.toFixed()) || 0,
      color: "#ffc658",
    },
  ];

  const categoryChartData = Object.keys(secondPieData || {}).map((key) => ({
    name: key,
    value: secondPieData[key],
    color: CATEGORY_COLOR_MAPPING[key] || "#AAAAAA",
  }));

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex gap-10 w-[1000px]">
      <Link to={AppRoutes.LIST}>
        <span className="flex bg-[rgb(83,81,81)] p-2 rounded-2xl">{"< Назад"}</span>
      </Link>
      <div className="flex flex-col border h-max p-5">
        <h1 className="font-bold text-3xl mb-10">Статистика</h1>
        <div className="flex flex-col gap-5">
          <span>Всего проверено: {data?.totalReviewed}</span>
          <span>Всего проверено за сегодня: {data?.totalReviewedToday}</span>
          <span>Всего проверено за неделю: {data?.totalReviewedThisWeek}</span>
          <span>Всего проверено за месяц: {data?.totalReviewedThisMonth}</span>
          <span>Процент одобренных: {data?.approvedPercentage.toFixed()}%</span>
          <span>
            Процент отклоненных: {data?.rejectedPercentage.toFixed()}%
          </span>
          <span>
            Процент с запросом изменений:{" "}
            {data?.requestChangesPercentage.toFixed()}%
          </span>
          <span>
            Среднее время проверки:{" "}
            {data ? formatReviewTime(data.averageReviewTime) : "Загрузка..."}
          </span>
        </div>
      </div>

      <div className="flex flex-col w-full gap-5 mt-10 justify-center items-center">
        <StatsPieChart data={chartData} />
        <SimpleBarChart data={barData} />
        <StatsPieChart data={categoryChartData} />
      </div>
    </div>
  );
};
