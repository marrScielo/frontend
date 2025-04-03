"use client";
import { Button, Input} from "@heroui/react";
{
  /*
  import { endOfWeek, getLocalTimeZone, startOfWeek, today } from "@internationalized/date";
  */}


import { X } from "lucide-react";
import { useState } from "react";


const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

interface TimesInterface {
  id: number;
  dia: string;
  start: string;
  end: string;
}

export default function Week() {
  const [fecha, setFecha] = useState<TimesInterface>({
    id: 0,
    dia: "",
    start: "",
    end: "",
  });
  const [horarios, setHorarios] = useState<TimesInterface[]>([]);

  const handleDayClick = (day: string) => {
    setFecha((prev) => ({ ...prev, dia: day }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFecha((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSchedule = () => {
    if (fecha.dia && fecha.start && fecha.end) {
      const newSchedule = {
        ...fecha,
        id: Date.now(),
      };
      setHorarios((prev) => [...prev, newSchedule]);
      setFecha({ id: 0, dia: "", start: "", end: "" });
    }
  };

  { /*const HandleFecha = () => {
    const date = startOfWeek(today(getLocalTimeZone()), 'es-ES');
    const finalDate = endOfWeek(today(getLocalTimeZone()), 'es-ES');
    const startDateJS = (date.year, date.month , date.day);
    const endDateJS = (finalDate.year, finalDate.month , finalDate.day);
    const dayOfWeek = 
    console.log("Primer día de la semana:", startDateJS);
    console.log("Último día de la semana:", endDateJS);
    
  
    const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    
  };
   */}
  const handleDeleteSchedule = (id: number) => {
    setHorarios((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="mx-auto max-w-sm flex flex-col my-14 text-[#634AE2]">
      <span className="text-center my-5">
        Eliga tus días disponibles de esta semana
      </span>
      <div>
        {daysOfWeek.map((day) => (
          <Button
            key={day}
            onPress={() => handleDayClick(day)}
            className={`gap-3 text-[#634AE2] px-4 mx-1 my-1 rounded-full transition 
              ${
                fecha.dia === day
                  ? "bg-[#634AE2] text-white"
                  : "bg-[#D2D2FF] hover:bg-[#B8B8FF]"
              }`}
          >
            {day}
          </Button>
        ))}
      </div>
      <div className="flex flex-row my-10 justify-between space-x-5">
        <Input
          name="start"
          label="Hora de inicio"
          radius="full"
          labelPlacement="outside"
          placeholder="00:00"
          type="time"
          step={1800} // Intervalo de 30 minutos
          value={fecha.start}
          className="!text-[#634AE2] h-[43px]"
          onChange={handleTimeChange}
        />

        <Input
          name="end"
          label="Hora de fin"
          radius="full"
          placeholder="00:00"
          type="time"
          value={fecha.end}
          labelPlacement="outside"
          className="!text-[#634AE2] rounded-full h-[43px]"
          onChange={handleTimeChange}
        />
      </div>
      <Button
        radius="full"
        className="bg-[#634AE2] mx-auto mb-10 px-10 text-white font-light"
        onPress={handleAddSchedule}
      >
        Agregar
      </Button>
      <div>
        <p className="mx-auto text-center">Lista de horarios seleccionados</p>

        {horarios.length > 0 ? (
          horarios.map((horario) => (
            <div
              key={horario.id}
              className="flex flex-row items-center justify-between rounded-3xl px-6 py-5 my-2 bg-[#D2D2FF] text-[#634AE2]"
            >
              <span>
                {horario.dia}: {horario.start} - {horario.end}
              </span>
              <button
                onClick={() => handleDeleteSchedule(horario.id)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#ababf8] transition"
              >
                <X
                  color="white"
                  size={20}
                  className="group-hover:text-gray-950"
                />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">
            No hay horarios agregados
          </p>
        )}
      </div>
    </div>
  );
}
