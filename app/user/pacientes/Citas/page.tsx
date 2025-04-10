"use client";
/*import React, { useEffect, useState } from "react";
import CerrarSesion from "@/components/CerrarSesion";
import { Icons } from "@/icons";
import NavbarPaciente from "@/components/User/Pacientes/NavbarPaciente";
import CitasPaciente from "@/components/User/Pacientes/CitasPaciente"; 
import { useSearchParams } from "next/navigation";
import { Paciente } from "@/interface";
import { parseCookies } from "nookies";
import Link from "next/link";*/

const PageHome = () => {
  /*const searchParams = useSearchParams();
  const idPaciente = searchParams.get("idPaciente");
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const idPacienteNum = Number(idPaciente);
  const HandleGetPaciente = async (idPaciente: number) => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/pacientes/${idPaciente}`;
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
      console.error(error);
    }
  };

  useEffect(() => {
    if (idPaciente) {
      HandleGetPaciente(idPacienteNum);
    }
  }, [idPaciente]);
*/
  return (
    <div className="pb-4 bg-[#eaeded]">
     {/*
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
                <button className="bg-[#634AE2] text-[#fff] rounded-full text-base px-4 py-2 font-normal">
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
       
        <div style={{ position: "relative", zIndex: 2 }}>
          <NavbarPaciente idPaciente={Number(idPaciente)}/>
        </div>
        
        <div
          className="flex justify-center"
          style={{ position: "relative", zIndex: 100, marginTop: "-180px" }}
        >
          <CitasPaciente idPaciente={Number(idPaciente)}/>
        </div>
      </div>
*/}
    </div>
  );
};

export default PageHome;