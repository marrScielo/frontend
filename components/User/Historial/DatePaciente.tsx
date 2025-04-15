import { Icons } from "@/icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  AtencionFormData,
  DatePacienteProps,
  ListaCitas,
  Paciente,
} from "@/interface";
import { parseCookies } from "nookies";
import Link from "next/link";
import { HistorialPaciente } from "./HistorialPaciente";

export const DatePaciente: React.FC<DatePacienteProps> = ({ pacienteId }) => {
  const [showCart, setShowCart] = useState(false);
  const [pacienteData, setPacienteData] = useState<Paciente | null>(null);
  const [, setAtenciones] = useState<ListaCitas[]>([]);
  const [ultimaAtencion, setUltimaAtencion] = useState<ListaCitas | null>(null);
  const [atencionPaciente, setAtencionPaciente] =
    useState<AtencionFormData | null>(null);

  // Extraer datos del paciente
  const handleGetPaciente = useCallback(async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/pacientes/${pacienteId}`;
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
        setPacienteData(data.result);
      }
    } catch (error) {
      console.error("Error al obtener paciente:", error);
    }
  }, [pacienteId]);

  const handleGetAtenciones = useCallback(async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/paciente/${pacienteId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.result) {
        const atenciones = Array.isArray(data.result) ? data.result.flat() : [];
        setAtenciones(atenciones);

        if (atenciones.length > 0) {
          const ultima = atenciones.reduce(
            (prev: ListaCitas, current: ListaCitas) =>
              prev.idAtencion > current.idAtencion ? prev : current
          );
          setUltimaAtencion(ultima);
        }
      }
    } catch (error) {
      console.error("Error al obtener atenciones:", error);
    }
  }, [pacienteId]);

  const handleGetAtencion = useCallback(async () => {
    if (!ultimaAtencion?.idAtencion) return;
    
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/${ultimaAtencion.idAtencion}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.result) {
        setAtencionPaciente(data.result[0]);
      }
    } catch (error) {
      console.error("Error al obtener atención específica:", error);
    }
  }, [ultimaAtencion]);

  // Efectos corregidos
  useEffect(() => {
    handleGetPaciente();
    handleGetAtenciones();
  }, [handleGetPaciente, handleGetAtenciones]);

  useEffect(() => {
    if (ultimaAtencion && !Array.isArray(ultimaAtencion)) {
      handleGetAtencion();
    }
  }, [ultimaAtencion, handleGetAtencion]);
  // Función para formatear fechas
  const formatFecha = (fechaString?: string) => {
    if (!fechaString) return "No registrada";
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Agrega estas funciones al componente
  function calcularEdad(fecha: Date | string | undefined) {
    if (!fecha) return null;
    const fechaNacimiento = typeof fecha === 'string' ? new Date(fecha) : fecha;
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const m = hoy.getMonth() - fechaNacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

  const formatDiaMes = (fechaString?: string) => {
    if (!fechaString) return "--/--";
    
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    
    return `${dia}/${mes}`;
  };

  return (
    <div className="max-w-[480px]">
      <div className="bg-[#fff] h-max text-[#634AE2] rounded-3xl">
        <div className="flex pl-6">
          <div className="w-[60%] pr-4">
            <div className="font-bold text-3xl">
              {pacienteData?.nombre} {pacienteData?.apellido}
            </div>
            <div className="font-bold text-xl">({calcularEdad(pacienteData?.fecha_nacimiento)})</div>
            <div className="align-items-center">
              <div className="flex align-items-center">
                <div className="font-bold pt-5">DNI</div>
                <div className="pt-5 ml-16">{pacienteData?.DNI}</div>
              </div>
              <div className="flex align-items-center">
                <div className="font-bold pt-5">Celular</div>
                <div className="pt-5 ml-9">{pacienteData?.celular}</div>
              </div>
              <div className="flex align-items-center">
                <div className="font-bold pt-5">Codigo</div>
                <div className="pt-5 ml-9">{pacienteData?.idPaciente}</div>
              </div>
            </div>
          </div>
          <div className="w-[35%] pr-3">
            <div className="bg-[#634AE2] rounded-3xl text-[#fff] p-2 text-center">
              <div className="text-4xl">{formatDiaMes(atencionPaciente?.FechaAtencion)}</div>
              <div className="pt-1">última atención</div>
            </div>
            <div className="border-2 border-[#634AE2] rounded-full text-center mt-2 justify-items-center pl-3 pr-3">
              <button onClick={() => setShowCart(true)}>
                Ver historial clínico
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-3 border-[#9494F3]" />
        <div className="font-bold text-3xl text-center pt-2">
          Ultima Atencion
        </div>
        <div className="flex">
          <div className="font-bold pt-1 w-20">Diagnóstico</div>
          <div className="pt-1 ml-14">{atencionPaciente?.Diagnostico}</div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Observación</div>
          <div className="pt-3 ml-14">{atencionPaciente?.Observacion}</div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Últimos objetivos</div>
          <div className="pt-3 ml-14">{atencionPaciente?.UltimosObjetivos}</div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Fecha de atención</div>
          <div className="pt-3 ml-14">
            {formatFecha(atencionPaciente?.FechaAtencion)}
          </div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Documentos adicionales</div>
          <div className="pt-5 ml-14 flex gap-5">
            <button className="border-2 rounded-full border-[#634AE2] w-40 flex items-center justify-center gap-1 h-9">
              <span
                dangerouslySetInnerHTML={{
                  __html: Icons.download.replace(
                    /<svg /,
                    '<svg fill="#634AE2" '
                  ),
                }}
                style={{
                  width: "1.4em",
                  height: "1.4em",
                }}
              />
              Descarga
            </button>
            <button className="border-2 rounded-full border-[#634AE2] w-40 flex items-center justify-center gap-1 h-9">
              <span
                dangerouslySetInnerHTML={{
                  __html: Icons.eye.replace(/<svg /, '<svg fill="#634AE2" '),
                }}
                style={{
                  width: "1.4em",
                  height: "1.4em",
                }}
              />
              Vista Previa
            </button>
          </div>
        </div>
      </div>
      <textarea
        className="bg-[#fff] w-full border-1 font-light text-[#634AE2] p-6 rounded-3xl mt-3 placeholder:text-[#634AE2]"
        placeholder="Aun no hay comentarios"
        value={atencionPaciente?.Comentario}
      />
      <div className="ml-8 space-x-20">
        <Link
          href={{
            pathname: "/user/historial/AtencionPaciente",
            query: { idCita: ultimaAtencion?.idCita },
          }}
        >
          <button className="text-[#fff] rounded-full bg-[#634AE2] w-52">
            Agregar atencion
          </button>
        </Link>
        <button className="ml-5 border-2 rounded-full border-[#634AE2] text-[#634AE2] w-36">
          Actualizar
        </button>
      </div>
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 justify-center pt-32 z-10 pl-72"
          onClick={() => setShowCart(false)}
        >
          <div
            className="relative bg-white p-6 rounded-3xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <HistorialPaciente pacienteId={pacienteId} />
          </div>
        </div>
      )}
    </div>
  );
};
