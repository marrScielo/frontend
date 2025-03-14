"use client";
import React, { useEffect, useState} from "react";
import DashboardComponents from "@/components/User/Dashboard/DashboardComponents";
import { UsuarioLocalStorage } from "@/interface";
import CerrarSesion from "@/components/CerrarSesion";

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
  const [user, setUser] = useState<UsuarioLocalStorage | null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as UsuarioLocalStorage);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="pb-8 bg-[#eaeded]">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl mt-3 h-[12vh] flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div>
                <div className="text-4xl font-bold text-[#634AE2]">
                  <h1>Buenos días, {user.nombre} {user.apellido}</h1>
                </div>
                <div className="text-xl font-normal text-[#634AE2] pt-1">
                  Prepárate para un gran día.
                </div>
                <div className="text-xl font-bold text-[#634AE2]">
                  Tienes x citas programadas para hoy
                </div>
                <div className="text-xl font-normal text-[#634AE2]">
                  Aprovecha para planificar tus próximos objetivos.
                </div>
              </div>
              <div className="flex gap-x-5 mt-2">
                <CerrarSesion />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <DashboardComponents />
    </div>
  );
};

export default PageHome;
