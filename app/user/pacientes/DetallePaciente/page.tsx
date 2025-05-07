"use client";

import React, { useEffect, useState } from "react";
import CerrarSesion from "@/components/CerrarSesion";
import { Icons } from "@/icons";
import NavbarPaciente from "@/components/User/Pacientes/NavbarPaciente";
import DatosPaciente from "@/components/User/Pacientes/DatosPaciente";
import { useSearchParams } from "next/navigation";
import { parseCookies } from "nookies";
import { Paciente } from "@/interface";
import Link from "next/link";

const PageHome = () => {
  const searchParams = useSearchParams();
  const idPaciente = searchParams.get("idPaciente");
  const [paciente, setPaciente] = useState<Paciente | null>(null);

  const idPacienteNum = Number(idPaciente);

  const handleGetPaciente = async (id: number) => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/pacientes/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPaciente(data.result);
      }
    } catch (error) {
      console.error("Error al obtener paciente:", error);
    }
  };

  useEffect(() => {
    if (idPaciente && !isNaN(idPacienteNum)) {
      handleGetPaciente(idPacienteNum);
    }
  }, [idPaciente, idPacienteNum]);

  return (
    <div className=" bg-[#eaeded]">
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl mt-3 h-[12vh] flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div className="flex justify-between gap-5">
                <Link href={`/user/pacientes/`}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: Icons.arrow.replace(
                        /<svg /,
                        '<svg fill="#634AE2" transform="rotate(90)" width="2em" height="2em" stroke="#634AE2" stroke-width="2" '
                      ),
                    }}
                  />
                </Link>
                <h1 className="text-4xl font-bold text-[#634AE2]">
                  {paciente?.nombre} {paciente?.apellido} #{idPaciente}
                </h1>
                <button className="bg-[#634AE2] text-white rounded-full text-base px-4 py-2 font-normal">
                  Nueva Cita
                </button>
              </div>
              <div className="flex gap-x-2 mt-2">
                <CerrarSesion />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div>
        <div >
          <NavbarPaciente idPaciente={idPacienteNum} />
        </div>

        <div
          className="flex justify-center"
        >
          <DatosPaciente idPaciente={idPacienteNum} />
        </div>
      </div>
    </div>
  );
};

export default PageHome;
