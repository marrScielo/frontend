"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Clients from "./clients";
import Appointments from "./appointments";
import Sales from "./sales";
import Performance from "./performance";

export default function ShowStadistic() {
  const [view, setView] = useState("clientes");

  const buttons = [
    { name: "Clientes", action: () => setView("clientes") },
    { name: "Citas", action: () => setView("citas") },
    { name: "Ventas", action: () => setView("ventas") },
    { name: "Rendimiento", action: () => setView("rendimiento") },
  ];

  return (
    <div>
      {/* Barra de botones */}
      <div className="w-full h-16 bg-[#6364F4] flex items-center justify-start">
        <div className="ml-10 flex justify-between items-center w-full max-w-[600px]">
          {buttons.map((btn, index) => (
            <Button
              key={index}
              className={`${
                view === btn.name.toLowerCase()
                  ? "bg-white text-[#634AE2]"
                  : "bg-[#634AE2] text-white"
              } text-[16px] leading-[20px] font-bold rounded-full px-9 py-2`}
              onClick={btn.action}
            >
              {btn.name}
            </Button>
          ))}
        </div>
      </div>

      <div>
        {view === "clientes" && <Clientes />}
        {view === "citas" && <Citas />}
        {view === "ventas" && <Ventas />}
        {view === "rendimiento" && <Rendimiento />}
      </div>
    </div>
  );
}


function Clientes() {
  return <div className="text-xl font-bold text-[#634AE2]">
    <Clients />
  </div>;
}

function Citas() {
  return <div className="text-xl font-bold text-[#634AE2]">
    <Appointments />
  </div>;
}

function Ventas() {
  return <div className="text-xl font-bold text-[#634AE2]">
    <Sales  />
  </div>;
}

function Rendimiento() {
  return <div className="text-xl font-bold text-[#634AE2]">
    <Performance />
  </div>;
}
