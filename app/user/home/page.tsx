"use client";
import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/Themetoggle";
import Link from "next/link";
import { DateRangePicker } from "@heroui/react";
import DashboardComponents from "@/components/User/Dashboard/DashboardComponents";
import { UsuarioLocalStorage } from "@/interface";

const navItems = [
  {
    name: "General",
    comp: "/user/home",
  },
  {
    name: "Clientes",
    comp: "/user/home",
  },
  {
    name: "Citas",
    comp: "/user/home",
  },
  {
    name: "Ventas",
    comp: "/user/home",
  },
  {
    name: "Rendimiento",
    comp: "/user/home",
  },
];

const PageHome = () => {
 
  return (
    <div className="pb-8 bg-[#eaeded]">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl mt-3 h-[12vh] flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div>
                <div className="text-4xl font-bold text-[#634AE2]">
                  <h1>¡Buenos días, X!</h1>
                </div>
                <div className="text-0xl font-normal text-[#634AE2] pt-1">
                  Prepárate para un gran día.
                </div>
                <div className="text-0xl font-bold text-[#634AE2]">
                  Tienes x citas programadas para hoy
                </div>
                <div className="text-0xl font-normal text-[#634AE2]">
                  Aprovecha para planificar tus próximos objetivos.
                </div>
              </div>
              <div className="flex gap-x-5 mt-2">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar */}     
      <DashboardComponents />
    </div>
  );
};

export default PageHome;