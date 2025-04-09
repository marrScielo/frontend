"use client";
import React, { useEffect, useRef, useState } from "react";
import { Icons } from "@/icons";
import { useDropzone } from "react-dropzone";
import CerrarSesion from "@/components/CerrarSesion";
import { AtencionFormData, Enfermedad, Paciente } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "@/components/ToastStyle";
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const idCita = searchParams.get('idCita');
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [idSearchTerm, setIdSearchTerm] = useState("");
  const [nameSearchTerm, setNameSearchTerm] = useState("");
  const [showIdDropdown, setShowIdDropdown] = useState(false);
  const [showNameDropdown, setShowNameDropdown] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(
    null
  );

  const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
  const [DSM5SearchTerm, setDSM5SearchTerm] = useState("");
  const [CEA10SearchTerm, setCEA10SearchTerm] = useState("");
  const [showDSM5Dropdown, setShowDSM5Dropdown] = useState(false);
  const [showCEA10Dropdown, setShowCEA10Dropdown] = useState(false);
  const [selectedEnfermedad, setSelectedEnfermedad] =
    useState<Enfermedad | null>(null);
  const idDropdownRef = useRef<HTMLDivElement>(null);
  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const DSM5DropdownRef = useRef<HTMLDivElement>(null);
  const CEA10DropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<AtencionFormData>({
    MotivoConsulta: "",
    FormaContacto: "",
    Diagnostico: "",
    Tratamiento: "",
    Observacion: "",
    idEnfermedad: "",
    UltimosObjetivos: "",
    FechaAtencion: new Date().toISOString().split("T")[0],
    DocumentosAdicionales: "",
    Comentario: "",
    descripcion: "",
  });
  //Paciente
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

  const filteredPacientesById = idSearchTerm
    ? pacientes.filter((paciente) =>
        paciente.idPaciente.toString().includes(idSearchTerm)
      )
    : pacientes;

  const filteredPacientesByName = nameSearchTerm
    ? pacientes.filter((paciente) =>
        paciente.nombre.toLowerCase().includes(nameSearchTerm.toLowerCase())
      )
    : pacientes;

  const handlePacienteSelect = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setIdSearchTerm(paciente.idPaciente.toString());
    setNameSearchTerm(paciente.nombre);
    setShowIdDropdown(false);
    setShowNameDropdown(false);
    setFormData({ ...formData, idCita: paciente.idPaciente });
  };

  //Enfermedades
  const handleGetEnfermedades = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/enfermedades`;
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
        setEnfermedades(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetPacientes();
    handleGetEnfermedades();
  }, []);

  const filteredEnfermedadesByDSM5 = DSM5SearchTerm
    ? enfermedades.filter((enfermedad) =>
        enfermedad.DSM5.toLowerCase().includes(DSM5SearchTerm.toLowerCase())
      )
    : enfermedades;

  const filteredEnfermedadesByCEA10 = CEA10SearchTerm
    ? enfermedades.filter((enfermedad) =>
        enfermedad.CEA10.toLowerCase().includes(CEA10SearchTerm.toLowerCase())
      )
    : enfermedades;

  const handleEnfermedadSelect = (enfermedad: Enfermedad) => {
    setSelectedEnfermedad(enfermedad);
    setDSM5SearchTerm(enfermedad.DSM5);
    setCEA10SearchTerm(enfermedad.CEA10);
    setShowDSM5Dropdown(false);
    setShowCEA10Dropdown(false);
    setFormData({
      ...formData,
      idEnfermedad: enfermedad.idEnfermedad.toString(),
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        idDropdownRef.current &&
        !idDropdownRef.current.contains(event.target as Node)
      ) {
        setShowIdDropdown(false);
      }
      if (
        nameDropdownRef.current &&
        !nameDropdownRef.current.contains(event.target as Node)
      ) {
        setShowNameDropdown(false);
      }
      if (
        DSM5DropdownRef.current &&
        !DSM5DropdownRef.current.contains(event.target as Node)
      ) {
        setShowDSM5Dropdown(false);
      }
      if (
        CEA10DropdownRef.current &&
        !CEA10DropdownRef.current.contains(event.target as Node)
      ) {
        setShowCEA10Dropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Post
  const HandlePostAtencion = async () => {
    console.log("=== Inicio de HandlePostAtencion ===");
    
    if (!selectedPaciente) {
      console.log("Error: No hay paciente seleccionado");
      showToast("error", "Selecciona un paciente primero");
      return;
    }
  
    if (!selectedEnfermedad) {
      console.log("Error: No hay enfermedad seleccionada");
      showToast("error", "Selecciona una enfermedad primero");
      return;
    }
  
    try {
      const atencionData = {
        MotivoConsulta: formData.MotivoConsulta,
        FormaContacto: formData.FormaContacto,
        Diagnostico: formData.Diagnostico,
        Tratamiento: formData.Tratamiento,
        Observacion: formData.Observacion,
        idEnfermedad: parseInt(formData.idEnfermedad), 
        UltimosObjetivos: formData.UltimosObjetivos,
        FechaAtencion: formData.FechaAtencion,
        DocumentosAdicionales: "formData.DocumentosAdicionales",
        Comentario: formData.Comentario,
        descripcion: selectedEnfermedad.nombreEnfermedad,
      };
  
      console.log("Datos a enviar:", atencionData);
      console.log("ID del paciente seleccionado:", selectedPaciente.idPaciente);
      console.log("Enfermedad seleccionada:", selectedEnfermedad);
  
      const cookies = parseCookies();
      const token = cookies["session"];
      console.log("Token de sesión:", token ? "Presente" : "Ausente");
  
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/${selectedPaciente.idPaciente}`;
      console.log("URL de la API:", url);
  
      console.log("Enviando solicitud...");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(atencionData),
      });
  
      console.log("Respuesta recibida. Status:", response.status);
      const data = await response.json();
      console.log("Datos de respuesta:", data);
  
      if (response.ok) {
        console.log("Atención creada exitosamente");
        showToast("success", "Atención creada correctamente");
        
        // Resetear el formulario
        setFormData({
          MotivoConsulta: "",
          FormaContacto: "",
          Diagnostico: "",
          Tratamiento: "",
          Observacion: "",
          idEnfermedad: "",
          UltimosObjetivos: "",
          FechaAtencion: new Date().toISOString().split("T")[0],
          DocumentosAdicionales: "",
          Comentario: "",
          descripcion: "",
        });
        setSelectedPaciente(null);
        setSelectedEnfermedad(null);
      } else {
        console.log("Error en la respuesta:", data.message || "Sin mensaje de error");
        showToast("error", data.message || "Error al crear la atención");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      showToast("error", "Error de conexión. Intenta nuevamente.");
    }
    
    console.log("=== Fin de HandlePostAtencion ===");
  };

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
              <div className="relative" ref={idDropdownRef}>
                <input
                  type="text"
                  value={idSearchTerm}
                  onChange={(e) => {
                    setIdSearchTerm(e.target.value);
                    setShowIdDropdown(true);
                  }}
                  onFocus={() => {
                    setShowIdDropdown(true);
                    setIdSearchTerm("");
                  }}
                  className="pl-12 pr-3 text-sm h-9 font-normal mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Buscar por ID"
                />
                {showIdDropdown && (
                  <div className="absolute z-10 top-12 w-full bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredPacientesById.length > 0 ? (
                      filteredPacientesById.map((paciente) => (
                        <div
                          key={paciente.idPaciente}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handlePacienteSelect(paciente)}
                        >
                          {paciente.idPaciente}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
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
              <div className="relative" ref={nameDropdownRef}>
                <input
                  type="text"
                  value={nameSearchTerm}
                  onChange={(e) => {
                    setNameSearchTerm(e.target.value);
                    setShowNameDropdown(true);
                  }}
                  onFocus={() => {
                    setShowNameDropdown(true);
                    setNameSearchTerm("");
                  }}
                  className="pl-12 pr-3 text-sm h-9 font-normal mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Buscar por nombre"
                />
                {showNameDropdown && (
                  <div className="absolute z-10 top-12 w-full bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredPacientesByName.length > 0 ? (
                      filteredPacientesByName.map((paciente) => (
                        <div
                          key={paciente.idPaciente}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handlePacienteSelect(paciente)}
                        >
                          {paciente.nombre}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
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
            <input
              type="text"
              readOnly
              className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
              value={selectedPaciente ? `${selectedPaciente.nombre}` : ""}
              placeholder="Ningún paciente seleccionado"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div>Motivo de la consulta</div>
              <div className="relative">
                <input
                  type="text"
                  name="MotivoConsulta"
                  value={formData.MotivoConsulta}
                  onChange={(e) =>
                    setFormData({ ...formData, MotivoConsulta: e.target.value })
                  }
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>Forma de contacto</div>
              <div className="relative">
                <input
                  type="text"
                  name="FormaContacto"
                  value={formData.FormaContacto}
                  onChange={(e) =>
                    setFormData({ ...formData, FormaContacto: e.target.value })
                  }
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1">Diagnostico</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="Diagnostico"
              value={formData.Diagnostico}
              onChange={(e) =>
                setFormData({ ...formData, Diagnostico: e.target.value })
              }
              placeholder="Ingrese su diagnóstico"
            />
          </div>
          <div className="text-center pt-1 pb-1">Tratamiento</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="Tratamiento"
              value={formData.Tratamiento}
              onChange={(e) =>
                setFormData({ ...formData, Tratamiento: e.target.value })
              }
              placeholder="Ingrese tratamiento"
            />
          </div>
          <div className="text-center pt-1 pb-1">Observacion</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="Observacion"
              value={formData.Observacion}
              onChange={(e) =>
                setFormData({ ...formData, Observacion: e.target.value })
              }
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
              name="UltimosObjetivos"
              value={formData.UltimosObjetivos}
              onChange={(e) =>
                setFormData({ ...formData, UltimosObjetivos: e.target.value })
              }
              placeholder="Objetivos Alcanzados"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div>DSM5</div>
              <div className="relative" ref={DSM5DropdownRef}>
                <input
                  type="text"
                  value={DSM5SearchTerm}
                  onChange={(e) => {
                    setDSM5SearchTerm(e.target.value);
                    setShowDSM5Dropdown(true);
                  }}
                  onFocus={() => {
                    setShowDSM5Dropdown(true);
                    setDSM5SearchTerm("");
                  }}
                  className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Buscar por DSM5"
                />
                {showDSM5Dropdown && (
                  <div className="absolute z-10 top-12 w-full bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredEnfermedadesByDSM5.length > 0 ? (
                      filteredEnfermedadesByDSM5.map((enfermedad) => (
                        <div
                          key={enfermedad.idEnfermedad}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handleEnfermedadSelect(enfermedad)}
                        >
                          {enfermedad.DSM5}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>CEA 10</div>
              <div className="relative" ref={CEA10DropdownRef}>
                <input
                  type="text"
                  value={CEA10SearchTerm}
                  onChange={(e) => {
                    setCEA10SearchTerm(e.target.value);
                    setShowCEA10Dropdown(true);
                  }}
                  onFocus={() => {
                    setShowCEA10Dropdown(true);
                    setCEA10SearchTerm("");
                  }}
                  className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Buscar por CEA10"
                />
                {showCEA10Dropdown && (
                  <div className="absolute z-10 top-12 w-full bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredEnfermedadesByCEA10.length > 0 ? (
                      filteredEnfermedadesByCEA10.map((enfermedad) => (
                        <div
                          key={enfermedad.idEnfermedad}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handleEnfermedadSelect(enfermedad)}
                        >
                          {enfermedad.CEA10}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1">Clasificación</div>
          <div className="flex justify-center">
            <input
              type="text"
              readOnly
              className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
              value={
                selectedEnfermedad
                  ? `${selectedEnfermedad.nombreEnfermedad}`
                  : ""
              }
              placeholder="Ningúna enfermedad seleccionada"
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
              name="Comentario"
              value={formData.Comentario}
              onChange={(e) =>
                setFormData({ ...formData, Comentario: e.target.value })
              }
              placeholder="Ingrese sus observaciones"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full p-4">
        <button className="text-[#fff] bg-[#634AE2] rounded-full w-28 h-8">
          Volver
        </button>
        <button
          onClick={HandlePostAtencion}
          className="text-[#634AE2] bg-[#fff] rounded-full border-2 border-[#634AE2] w-28 h-8"
        >
          Registrar
        </button>
      </div>
    </div>
  );
}
