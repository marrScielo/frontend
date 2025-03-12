"use client";
import React from "react";
import CerrarSesion from "@/components/CerrarSesion";
import { Icons } from "@/icons";
import NavbarPaciente from "@/components/User/Pacientes/NavbarPaciente";
import DatosPaciente from "@/components/User/Pacientes/DatosPaciente";

const PageHome = () => {
  return (
    <div className="pb-8 bg-[#eaeded]">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl mt-3 h-[12vh] flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div className="flex justify-between gap-5">
                <button>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: Icons.arrow.replace(
                        /<svg /,
                        '<svg fill="#634AE2" transform="rotate(90)" width="2em" height="2em" stroke="#634AE2" stroke-width="2" '
                      ),
                    }}
                  />
                </button>
                <h1 className="text-4xl font-bold text-[#634AE2]">
                  Manuel Peres #1{" "}
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
      {/* Navbar */}
      <NavbarPaciente/>

      <DatosPaciente/>
    </div>
  );
};

export default PageHome;
