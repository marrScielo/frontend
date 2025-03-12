"use client";
import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/Themetoggle";
import DashboardComponents from "@/components/User/Dashboard/DashboardComponents";
import { UsuarioLocalStorage } from "@/interface";

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
                <ThemeToggle />
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
