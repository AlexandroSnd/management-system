import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const StatsPieChart = ({
  isAnimationActive = true,
  data,
}: {
  isAnimationActive?: boolean;
  data: { name: string; value: number; color: string }[];
}) => {
  console.log('FIRST',data)
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-gray-500">Нет данных для графика активности.</div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart margin={{ top: 50, right: 50, bottom: 50, left: 50 }}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={50}
          paddingAngle={3}
          isAnimationActive={isAnimationActive}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default StatsPieChart;
