import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatsBarData = {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
};

const SimpleBarChart = ({ data }: { data: StatsBarData[] }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-gray-500">Нет данных для графика активности.</div>
    );
  }
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString().slice(0, 5),
  }));

  return (
    <div className="flex flex-col w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          responsive
          data={formattedData}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2 2" />
          <XAxis dataKey="date" />
          <YAxis
            width="auto"
            label={{
              value: "Количество объявлений",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />
          <Tooltip />
          <Bar
            dataKey="approved"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="rejected"
            fill="red"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="requestChanges"
            fill="#ffc658"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
      <h3>Активность модерации по дням</h3>
    </div>
  );
};

export default SimpleBarChart;
