"use client";
import React, { useEffect, useState } from "react";
import { Icons } from "@/icons";
import { useDropzone } from "react-dropzone";
import CerrarSesion from "@/components/CerrarSesion";
import { Paciente } from "@/interface";
import { parseCookies } from "nookies";

function DropzoneWithoutKeyboard() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noKeyboard: true,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="container border-1 border-[#634AE2] rounded-2xl w-11/12">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-[#634AE2] text-center text-8xl">+</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default function App() {
 // const [pacienteData, setPacienteData] = useState<Paciente | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(
    null
  );

  const handleGetPacientes = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/pacientes`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setPacientes(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetPacientes();
  }, []);

  const filteredPacientes = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePacienteSelect = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setSearchTerm(paciente.nombre);
    setShowDropdown(false);
  };

 /* const handlePacienteIdSelect = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setSearchTerm(paciente.idPaciente);
    setShowDropdown(false);
  };*/

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
              <h1>Atencion al paciente</h1>
            </div>
          </div>
        </div>
        {/* body */}
      </div>
      <div className="flex mt-4 text-[#634AE2] font-bold text-normal">
        <div className="flex-1 ml-5 mr-5 bg-[#fff] rounded-2xl p-4">
          <div className="flex pt-2">
            <div className="flex-1 items-center justify-items-center">
              <div>Codigo del Paciente *</div>
              <div className="relative">
                <div className="flex justify-center relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="pl-12 pr-3 text-sm h-9 font-normal mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                    placeholder="Buscar paciente"
                  />
                  {showDropdown && filteredPacientes.length > 0 && (
                    <div className="absolute z-10 top-12 w-11/12 bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredPacientes.map((paciente) => (
                        <div
                          key={paciente.idPaciente}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                         // onClick={() => handlePacienteIdSelect(paciente)}
                        >
                          {paciente.idPaciente}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.loup.replace(
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
              <div>Nombre del Paciente</div>
              <div className="relative">
                <div className="flex justify-center relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="pl-12 pr-3 text-sm h-9 font-normal mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                    placeholder="Buscar paciente"
                  />
                  {showDropdown && filteredPacientes.length > 0 && (
                    <div className="absolute z-10 top-12 w-11/12 bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredPacientes.map((paciente) => (
                        <div
                          key={paciente.idPaciente}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handlePacienteSelect(paciente)}
                        >
                          {paciente.nombre}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
                  dangerouslySetInnerHTML={{
                    __html: Icons.loup.replace(
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
          <div className="text-center pt-1">Paciente</div>
          <div className="flex justify-center">
            {selectedPaciente && (
              <input
                type="text"
                readOnly
                className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                value={selectedPaciente ? selectedPaciente.nombre : ""}
                placeholder={
                  selectedPaciente ? "" : "Ningún paciente seleccionado"
                }
              />
            )}
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div>Motivo de la consulta</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>Forma de contacto</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1">Diagnostico</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              placeholder="Ingrese su diagnóstico"
            />
          </div>
          <div className="text-center pt-1 pb-1">Tratamiento</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              placeholder="Ingrese tratamiento"
            />
          </div>
          <div className="text-center pt-1 pb-1">Observacion</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              placeholder="Ingrese sus observaciones"
            />
          </div>
        </div>
        {/*Segunda Columna*/}
        <div className="flex-1 mr-5 ml-5 bg-[#fff] rounded-2xl p-6">
          <div className="text-center pt-1 pb-1">
            Últimos objetivos / Objetivo alcanzado
          </div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              placeholder="Objetivos Alcanzados"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div>DSM5</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>CEA 10</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1">Clasificación</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              placeholder="Ingrese su diagnóstico"
            />
          </div>
          <div className="text-center pt-1 pb-1">Documento adicionales</div>
          <div className="flex justify-center">
            <DropzoneWithoutKeyboard />
          </div>
          <div className="text-center pt-1 pb-1">Comentario</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              placeholder="Ingrese sus observaciones"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full p-4">
        <button className="text-[#fff] bg-[#634AE2] rounded-full w-28 h-8">
          Volver
        </button>
        <button className="text-[#634AE2] bg-[#fff] rounded-full border-2 border-[#634AE2] w-28 h-8">
          Registrar
        </button>
      </div>
    </div>
  );
}
