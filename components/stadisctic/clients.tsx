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
} from "recharts";

// Datos para el gráfico de pastel
const genero = [
  { name: "Desconocido", Total: 20 },
  { name: "Masculino", Total: 40 },
  { name: "Femenino", Total: 40 },
];

const COLORS = ["#7777FF", "#66A3FF", "#B3B3FF"];

const edad = [
  { name: "0 - 12", Total: 10 },
  { name: "13 - 17", Total: 5 },
  { name: "18 - 24", Total: 17 },
  { name: "25 - 34", Total: 12 },
  { name: "35 - 44", Total: 6 },
  { name: "45 - 54", Total: 7 },
];

const lugar = [
  { name: "Surco", Total: 10 },
  { name: "Jesús María", Total: 5 },
  { name: "Surquillo", Total: 17 },
  { name: "Barranco", Total: 12 },
  { name: "San Borja", Total: 6 },
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
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 m-5 place-items-center gap-5 max-w-[920px] mx-auto">
      <div className="w-[401px] h-[600px] bg-white rounded-2xl flex flex-col">
        <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
          <p className="text-white font-medium text-center mr-10 text-xl">Género:</p>
        </div>

        <div className="w-full h-[350px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                dataKey="Total"
                data={genero}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={140}
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

        <div className="grid justify-start gap-5 mt-4 ml-14">
          {genero.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-[#634AE2] font-medium text-base">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Segunda columna  */}
      <div className="flex flex-col w-[502px] h-[600px] gap-5">
        <div className="w-full h-[300px] bg-white rounded-2xl flex flex-col">
          <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
            <p className="text-white font-medium text-center mr-10 text-xl">Edad:</p>
          </div>

          <div className="flex-1 flex items-center justify-center ">
            <ResponsiveContainer width="90%" height="80%">
              <BarChart
                data={edad}
                margin={{ top: 15, right: 10, left: 5, bottom: 15 }}
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
                          {payload.value}
                        </tspan>
                        <tspan x={x} dy="15">
                          años
                        </tspan>{" "}
                      </text>
                    );
                  }}
                />

                <YAxis
                  tick={{ fontSize: 12, fill: "#634AE2" }}
                  tickLine={{ stroke: "#634AE2" }}
                  axisLine={{ stroke: "#634AE2" }}
                />
                <Tooltip />
                <Bar
                  dataKey="Total"
                  fill="#9494F3"
                  barSize={35}
                  radius={[5, 5, 0, 0]}
                  opacity={0.6}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

       
        <div className="w-full h-[300px] bg-white rounded-2xl flex flex-col">
          <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
            <p className="text-white font-medium text-center mr-10 text-xl">Lugar:</p>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <ResponsiveContainer width="90%" height="80%" >
              <BarChart
                data={lugar}
                margin={{ top: 15, right: 10, left: 5, bottom: 15 }}
              >
                <XAxis
                  dataKey="name"
                  tickLine={{ stroke: "#634AE2" }}
                  axisLine={{ stroke: "#634AE2" }}
                  tick={{ fontSize: 12, fill: "#634AE2", fontWeight: "500" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#634AE2" }}
                  tickLine={{ stroke: "#634AE2" }}
                  axisLine={{ stroke: "#634AE2" }}
                />
                <Tooltip />
                <Bar
                  dataKey="Total"
                  fill="#9494F3"
                  barSize={35}
                  radius={[5, 5, 0, 0]}
                  opacity={0.6}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
