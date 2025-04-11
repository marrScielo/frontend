import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

// Datos para el LineChart
const data = [
  { name: "01", uv: 4000, pv: 2400 },
  { name: "02", uv: 3000, pv: 1398 },
  { name: "03", uv: 2000, pv: 9800 },
  { name: "04", uv: 2780, pv: 3908 },
  { name: "05", uv: 1890, pv: 4800 },
  { name: "06", uv: 2390, pv: 3800 },
];

const genero = [
  { name: "Psicólogo 1", Total: 30 },
  { name: "Psicólogo 2", Total: 50 },
  { name: "Psicólogo 3", Total: 20 },
];

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
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

const COLORS = ["#B158FF", "#7D7DFF", "#58A6FF"];

export default function Performance() {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 m-5 gap-5 xl:w-[950px]  w-[350px] xl:h-[406px] h-full mx-auto bg-white rounded-2xl ">
      <div className="flex flex-col">
        <div className="rounded-r-full w-[301px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
          <p className="text-white font-medium text-start mr-10 text-xl">
            Rendimiento del <br /> equipo:
          </p>
        </div>
        <div className="h-full flex items-center justify-center mt-4">
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="70%">
              <LineChart
                data={data}
                margin={{ top: 30, right: 30, left: 20, bottom: 12}}
              >
                <XAxis
                  dataKey="name"
                  tickLine={{ stroke: "#634AE2" }}
                  axisLine={{ stroke: "#634AE2" }}
                  tick={({ x, y, payload }) => {
                    return (
                      <text
                        x={x}
                        y={y + 15}
                        fill="#634AE2"
                        textAnchor="middle"
                        fontSize={12}
                        fontWeight="500"
                      >
                        <tspan x={x} dy="0">
                          feb,
                        </tspan>{" "}
                        <tspan x={x} dy="15">
                          {payload.value}
                        </tspan>
                      </text>
                    );
                  }}
                />
                <YAxis
                  tickFormatter={(value: number) => (value / 1250).toString()}
                  tick={{ fill: "#634AE2" }}
                  axisLine={{ stroke: "#634AE2" }}
                  tickLine={{ stroke: "#634AE2" }}
                />

                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#634AE2"
                  activeDot={{ r: 8, fill: "#634AE2" }}
                />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#58A6FF"
                  activeDot={{ r: 8, fill: "#634AE2" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <div className="w-full h-[200px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="Total"
                data={genero}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {genero.map((entry, index) => (
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

        {/* Leyenda del PieChart */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[300px] mx-auto mt-6">
          {genero.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-[#634AE2] font-normal text-base">
                {entry.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
