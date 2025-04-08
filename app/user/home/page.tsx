"use client";
import React, { useEffect, useState } from "react";
import DashboardComponents from "@/components/User/Dashboard/DashboardComponents";
import { UsuarioLocalStorage } from "@/interface";
import CerrarSesion from "@/components/CerrarSesion";

const PageHome = () => {
  const [user, setUser] = useState<UsuarioLocalStorage | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    <section>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="m-5">
        <h1 className="text-2xl md:text-4xl  font-bold text-[#634AE2]">
          Buenos días, {user.nombre} {user.apellido}
        </h1>
        <p className="text-base md:text-xl font-normal text-[#634AE2] pt-1">
          Prepárate para un gran día.
        </p>
        <p className="text-base md:text-xl font-bold text-[#634AE2]">
          Tienes x citas programadas para hoy
        </p>
        <p className="text-base md:text-xl font-normal text-[#634AE2]">
          Aprovecha para planificar tus próximos objetivos.
        </p>  </div>
        
        <div className="mx-auto md:mx-0 m-4 md:m-5">
        <CerrarSesion />
      
        </div>
      </div>

        
          <DashboardComponents />
       
    </section>
  );
};

export default PageHome;

/*
<div className="flex flex-1 flex-col bg-[#eaeded] w-full z-30 mt-4">
  <div className="bg-[#eaeded] rounded-2xl mt-3 h-[12vh] flex items-center w-full max-w-[calc(95vw-270px)] p-4 mx-auto">
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4">
      <div className="flex-1">
        <h1 className="text-2xl md:text-4xl font-bold text-[#634AE2]">
          Buenos días, {user.nombre} {user.apellido}
        </h1>
        <p className="text-base md:text-xl font-normal text-[#634AE2] pt-1">
          Prepárate para un gran día.
        </p>
        <p className="text-base md:text-xl font-bold text-[#634AE2]">
          Tienes x citas programadas para hoy
        </p>
        <p className="text-base md:text-xl font-normal text-[#634AE2]">
          Aprovecha para planificar tus próximos objetivos.
        </p>
      </div>
      <div className="flex gap-x-5 mt-2 md:mt-0">
        <CerrarSesion />
      </div>
    </div>
  </div>
</div>

*/
