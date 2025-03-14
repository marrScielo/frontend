"use client";
import React from "react";
import { Icons } from "@/icons";
import CerrarSesion from "@/components/CerrarSesion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function App() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-end justify-end w-full">
              <div className="flex gap-x-5">
                <CerrarSesion />
              </div>
            </div>
          </nav>
          <div>
            <div className="pl-12 text-4xl items-center justify-items-center font-bold text-[#634AE2]">
              <h1>Datos del Paciente</h1>
            </div>
          </div>
        </div>
        {/* body */}
      </div>
      <div className="flex mt-4 text-[#634AE2] font-bold text-normal">
        <div className="flex-1 ml-5 mr-5 bg-[#fff] rounded-2xl p-4">
          <div className="flex pt-6">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Nombre</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">DNI</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Apellido Paterno</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Apellido Materno</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Fecha de nacimiento</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Edad</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Estado civil</div>
              <div className="relative">
                <input
                  type="text"
                  className="placeholder:text-base placeholder:font-normal pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Seleccionar"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 pt-1 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="currentColor" '
                    ),
                  }}
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Genero</div>
              <div className="relative">
                <input
                  type="text"
                  className="placeholder:text-base placeholder:font-normal pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Seleccionar"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 pt-1 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="currentColor" '
                    ),
                  }}
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">Celular</div>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Ejemp. 999999999"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
        </div>
        {/*Segunda Columna*/}
        <div className="flex-1 mr-5 ml-5 bg-[#fff] rounded-2xl p-6">
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Correo electrónico
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Departamento</div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Seleccionar"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] placeholder:text-base placeholder:font-normal bg-[#F3F3F3]"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 pt-1 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="currentColor" '
                    ),
                  }}
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Provincia</div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Seleccionar"
                  className="placeholder:text-base placeholder:font-normal pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2  pt-1 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="currentColor" '
                    ),
                  }}
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Distrito</div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Seleccionar"
                  className="placeholder:text-base placeholder:font-normal pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 pt-1 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="currentColor" '
                    ),
                  }}
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Direccion</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Antecedentes médicos
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Medicamentos prescritos
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full p-4 ">
        <Link
          href="/user/pacientes/RegistroFamiliar"
          className={cn(
            "text-[#fff] bg-[#634AE2] pt-1 rounded-full w-auto h-8 mr-16 px-6 flex"
          )}
        >
          <span
            className="text-[#634AE2] transition-colors"
            dangerouslySetInnerHTML={{
              __html: Icons.registrarPaciente.replace(
                /<svg /,
                '<svg fill="#634AE2"'
              ),
            }}
          />
          Registro familiar
        </Link>
        <button className="text-[#634AE2] bg-[#fff] rounded-full border-2 border-[#634AE2] w-28 h-8 mr-12">
          Registrar
        </button>
      </div>
    </div>
  );
}
