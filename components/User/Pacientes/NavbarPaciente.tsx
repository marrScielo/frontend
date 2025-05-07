"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DatosPacienteProps } from "@/interface";

const NavbarPaciente : React.FC<DatosPacienteProps> = ({ idPaciente }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  const navItems = [
    { name: "Datos Personales", link: `/user/pacientes/DetallePaciente/`},
    { name: "Historial Clinico", link:`/user/pacientes/HistorialClinico/` },
  ];
  
  return (
    <div>
      <div className="flex w-full mt-4 pl-8 mb-4">
        <div className="bg-[#6364F4] w-full h-[8vh] flex flex-row items-center px-4 mt-10 ">
          <div className="flex flex-row gap-4">
            <div className="w-full max-w-xl flex flex-row gap-4 justify-between">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={{
                    pathname: item.link,
                    query: {
                      idPaciente: idPaciente,
                    },
                  }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    "text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#6364F4] px-4 py-2",
                    pathname === item.link || hovered === idx
                      ? "bg-[#fff] text-[#6364F4]"
                      : ""
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPaciente;
