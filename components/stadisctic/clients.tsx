import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

// Datos para el gráfico de pastel
const pieData = [
  { name: "Desconocido", value: 20 },
  { name: "Masculino", value: 40 },
  { name: "Femenino", value: 40 },
];

const COLORS = ["#7777FF", "#66A3FF", "#B3B3FF"];


const barData = [
  { name: "0 - 12\naños", value: 10 },
  { name: "13 - 17\naños", value: 5 },
  { name: "18 - 24\naños", value: 17 },
  { name: "15 - 34\naños", value: 12 },
  { name: "35 - 44\naños", value: 6 },
  { name: "45 - 54\naños", value: 7 }
];

// Función para las etiquetas personalizadas en el gráfico de pastel
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Clients() {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 m-5 place-items-center gap-5 max-w-[950px] mx-auto">
      <div className="w-[401px] h-[600px] bg-white rounded-2xl flex flex-col">
        <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
          <p className="text-white font-medium text-center mr-10">Género:</p>
        </div>

        <div className="w-full h-[400px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="value"
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={140}
                fill="#8884d8"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segunda columna (Edad + gráfico de barras) */}
      <div className="flex flex-col w-[502px] h-[600px] gap-5">
        <div className="w-full h-[300px] bg-white rounded-2xl flex flex-col">
          <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
            <p className="text-white font-medium text-center mr-10">Edad:</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="90%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: "#666" }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 12, fill: "#666" }} tickLine={false} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#9494F3"
                  barSize={35}
                  radius={[5, 5, 0, 0]}
                  opacity={0.6}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sección "Lugar" */}
        <div className="w-full h-[300px] bg-white rounded-2xl">
          <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
            <p className="text-white font-medium text-center mr-10">Lugar:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
