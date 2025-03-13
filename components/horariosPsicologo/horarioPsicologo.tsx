import React, { useState } from "react";
import ZonaHorariaSelect from "./zonaHorariaSelect";

interface Horarios {
  [dia: string]: [string, string][];
}

interface Cita {
  fecha: string;
  hora_cita: string;
}

interface BotonHorarioProps {
  hora: string;
  ocupada: boolean;
}

const horarios: Horarios = {
  Lunes: [["09:00", "15:00"]],
  Martes: [["10:00", "13:00"]],
  Miércoles: [["08:00", "12:00"]],
  Jueves: [["09:00", "11:00"]],
  Viernes: [["10:00", "14:00"]],
  Sábado: [],
};

const citasPendientes: Cita[] = [
  { fecha: "2025-03-10", hora_cita: "10:00" },
  { fecha: "2025-03-11", hora_cita: "11:00" },
  { fecha: "2025-03-12", hora_cita: "09:00" },
  { fecha: "2025-03-13", hora_cita: "14:00" },
  { fecha: "2025-03-14", hora_cita: "12:00" },
];

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const convertirHoraZona = (fechaISO: string, hora: string, zonaOrigen: string, zonaDestino: string): string => {
  const fecha = new Date(`${fechaISO}T${hora}:00`);
  return fecha.toLocaleTimeString("es-ES", {
    timeZone: zonaDestino,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const generarHorarios = (inicio: string, fin: string, zonaOrigen: string, zonaDestino: string): string[] => {
  const horas: string[] = [];
  const actual = new Date(`2025-01-01T${inicio}`);
  const end = new Date(`2025-01-01T${fin}`);

  while (actual <= end) {
    horas.push(actual.toLocaleTimeString("es-ES", {
      timeZone: zonaDestino,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }));
    actual.setMinutes(actual.getMinutes() + 60);
  }
  return horas;
};

const obtenerEtiquetaDia = (fecha: Date, hoyISO: string, mananaISO: string, formateador: Intl.DateTimeFormat): string => {
  const fechaISO = fecha.toISOString().split("T")[0];
  return fechaISO === hoyISO ? "Hoy" : fechaISO === mananaISO ? "Mañana" : formateador.format(fecha).concat(".");
};

const BotonHorario: React.FC<BotonHorarioProps> = ({ hora, ocupada }) => (
  <button
    className={`w-full p-3 rounded-full font-semibold ${
      ocupada ? "line-through bg-[#EDEDED] text-[#CACACB]" : "bg-[#EAEAFF] text-[#634AE2]"
    }`}
    disabled={ocupada}
  >
    {hora}
  </button>
);

const HorarioPsicologo: React.FC = () => {
  const [semanaOffset, setSemanaOffset] = useState(0);
  const [zonaHoraria, setZonaHoraria] = useState("America/Lima");

  const fechaBase = new Date();
  fechaBase.setDate(fechaBase.getDate() + semanaOffset * 7);
  fechaBase.setHours(0, 0, 0, 0);

  const hoyISO = new Date().toISOString().split("T")[0];
  const mananaISO = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const cambiarSemana = (direccion: number) => setSemanaOffset((prev) => Math.max(0, prev + direccion));

  const formateadorFecha = new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short" });

  return (
    <div className="p-5 bg-white w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center text-purple-700">¡Escoge el mejor horario que se adapte a ti!</h2>
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
        <button onClick={() => cambiarSemana(-1)} disabled={semanaOffset === 0} className={`p-2 ${semanaOffset === 0 ? "opacity-50" : ""}`}>&lt;</button>
        <ZonaHorariaSelect onChange={setZonaHoraria} />
        <button className="text-lg" onClick={() => cambiarSemana(1)}>&gt;</button>
      </div>

      <div className="mt-4 overflow-x-auto">
        {/*Cabecera de dias de la semana */}
        <div className="grid grid-cols-6 gap-2">
          {diasSemana.map((dia, index) => {
            const fecha = new Date(fechaBase);
            fecha.setDate(fechaBase.getDate() - fechaBase.getDay() + index + 1);
            return (
              <div key={dia} className="text-center p-3 w-full rounded-full bg-[#9494F3] text-white">
                <p>{dia}</p>
                <p className="text-md">{obtenerEtiquetaDia(fecha, hoyISO, mananaISO, formateadorFecha)}</p>
              </div>
            );
          })}
        </div>

        {/*Horarios del psicologo */}
        <div className="mt-3 grid grid-cols-6 gap-2">
          {diasSemana.map((dia, index) => {
            const fecha = new Date(fechaBase);
            fecha.setDate(fechaBase.getDate() - fechaBase.getDay() + index + 1);
            const fechaStr = fecha.toISOString().split("T")[0];

            const horasDisponibles = (horarios[dia] || []).flatMap(([inicio, fin]) =>
              generarHorarios(inicio, fin, "America/Lima", zonaHoraria)
            );
            const maxHoras = Math.max(...Object.values(horarios).flatMap((r) => r.map(([i, f]) => generarHorarios(i, f, "America/Lima", "America/Lima").length)));
            const horasCompletas = horasDisponibles.concat(Array(maxHoras - horasDisponibles.length).fill(""));
            const citasConvertidas = citasPendientes.map((cita) => ({
              fecha: cita.fecha,
              hora_cita: convertirHoraZona(cita.fecha, cita.hora_cita, "America/Lima", zonaHoraria),
            }));

            return (
              <div key={dia} className="text-center space-y-2">
                {horasCompletas.map((hora, idx) =>
                  hora ? (
                    <BotonHorario key={hora} hora={hora} ocupada={citasConvertidas.some((cita) => cita.fecha === fechaStr && cita.hora_cita.startsWith(hora))} />
                  ) : (
                    <button key={`empty-${idx}`} className="w-full p-3 rounded-full bg-[#EDEDED] text-[#CACACB]" disabled>-</button>
                  )
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HorarioPsicologo;
