import React, { useEffect, useState } from "react";
import DetallesPaciente from "../Historial/DetallesPaciente";
import { DatosPacienteProps, Paciente, UltimaAtencion } from "@/interface";
import showToast from "@/components/ToastStyle";
import { parseCookies } from "nookies";

const HistorialPaciente: React.FC<DatosPacienteProps> = ({ idPaciente }) => {
  const [showCart, setShowCart] = useState(false);
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [ultimaAtencion, setUltimaAtencion] = useState<UltimaAtencion | null>(null);
  const [comentario, setComentario] = useState("");
  //Traer un paciente por el ID
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
        showToast("success", "Paciente obtenido correctamente");
      } else {
        showToast("error", data.message || "Error al obtener el paciente");
      }
    } catch {
      showToast("error", "Error de conexión. Intenta nuevamente.");
    }
  };

  const HandleGetUltimaAtencion = async (idPaciente: number) => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/ultima/paciente/${idPaciente}`;
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
        setUltimaAtencion(data.result);
      } else {
        showToast("error", data.message || "No se pudo obtener la última atención");
      }
    } catch {
      showToast("error", "Error al conectar con la API de atenciones.");
    }
  };

  const handleActualizarComentario = async () => {
    if (!ultimaAtencion?.idAtencion) return;
  
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/${ultimaAtencion.idAtencion}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          comentario,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        showToast("success", "Comentario actualizado correctamente");
      } else {
        showToast("error", data.message || "Error al actualizar comentario");
      }
    } catch {
      showToast("error", "Error de conexión al actualizar comentario");
    }
  };


  useEffect(() => {
    if (idPaciente) {
      HandleGetPaciente(idPaciente);
      HandleGetUltimaAtencion(idPaciente);
    }
  }, [idPaciente]);

  useEffect(() => {
    if (ultimaAtencion?.comentario) {
      setComentario(ultimaAtencion.comentario);
    } else {
      setComentario(""); 
    }
  }, [ultimaAtencion]);

  return (
    <div className="mt-2 w-[500px]">
      <div className="p-4 bg-[#fff] h-max text-[#634AE2] rounded-3xl">
        <div className="flex pl-6">
          <div className="w-[60%] pr-4">
            <div className="font-bold text-3xl">{paciente?.nombre}</div>
            <div className="align-items-center">
              <div className="flex align-items-center">
                <div className="font-bold pt-5">DNI</div>
                <div className="pt-5 ml-16">{paciente?.DNI}</div>
              </div>
              <div className="flex align-items-center">
                <div className="font-bold pt-5">Celular</div>
                <div className="pt-5 ml-9">{paciente?.celular}</div>
              </div>
              <div className="flex align-items-center">
                <div className="font-bold pt-5">Codigo</div>
                <div className="pt-5 ml-9">{paciente?.codigo}</div>
              </div>
            </div>
          </div>
          <div className="w-[35%] pr-3">
            <div className="bg-[#634AE2] rounded-3xl text-[#fff] p-2 text-center">
              <div className="text-4xl">
                {ultimaAtencion ? ultimaAtencion.fecha_atencion : "--/--"}
              </div>
              <div className="pt-1">última atención</div>
            </div>
            <div className="border-2 border-[#634AE2] rounded-full text-center mt-2 justify-items-center py-2">
              <button onClick={() => setShowCart(true)}>Ver historial clínico</button>
            </div>
          </div>
        </div>
        <hr className="mt-3 border-[#9494F3]" />
        <div className="font-bold text-3xl text-center pt-2">
          Última Atención
        </div>
        <div className="flex">
          <div className="font-bold pt-1 w-20">Diagnóstico</div>
          <div className="pt-1 ml-14">{ultimaAtencion?.diagnostico}</div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Observación</div>
          <div className="pt-3 ml-14">{ultimaAtencion?.observacion}</div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Últimos objetivos</div>
          <div className="pt-3 ml-14">{ultimaAtencion?.ultimosObjetivos}</div>
        </div>
      </div>
      <textarea  rows={4} 
        className="bg-[#fff] w-full border-1 font-light text-[#634AE2] p-6 rounded-3xl mt-3 placeholder:text-[#634AE2]"
        defaultValue={ultimaAtencion?.comentario ?? ''} placeholder="Comentario..." onChange={(e) => setComentario(e.target.value)}
      />
      <div className="ml-8 space-x-20">
      <button
        className="ml-5 border-2 rounded-full border-[#634AE2] text-[#634AE2] w-36 
                  disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleActualizarComentario}
        disabled={!ultimaAtencion?.idAtencion}
      >
        Actualizar
      </button>
      </div>
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-20"
          onClick={() => setShowCart(false)}
        >
          <div
            className="relative bg-white p-6 rounded-3xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <DetallesPaciente ultimaAtencion={ultimaAtencion} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialPaciente;