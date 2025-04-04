"use client";
import { UpdatePsicologo } from "@/app/apiRoutes";
import showToast from "@/components/ToastStyle";
import { PsicologoPreviewData, UsuarioLocalStorage } from "@/interface";
import { Button, Input, ScrollShadow } from "@heroui/react";
import { error } from "console";
{
  /*
  import { endOfWeek, getLocalTimeZone, startOfWeek, today } from "@internationalized/date";
  */
}

import { X } from "lucide-react";
import { parseCookies } from "nookies";
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
    start: "08:00",
    end: "18:00",
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
    if (!fecha.dia) {
      showToast("error", "Selecciona un día");
      return;
    }

    if (!fecha.start || !fecha.end) {
      showToast("error", "Completa ambas horas");
      return;
    }

    if (fecha.start >= fecha.end) {
      showToast("error", "La hora de fin debe ser mayor que la de inicio");
      return;
    }

    const newSchedule = {
      ...fecha,
      id: Date.now(),
    };

    setHorarios((prev) => [...prev, newSchedule]);
    setFecha({
      id: 0,
      dia: "",
      start: "08:00",
      end: "18:00",
    });
  };
  const formatHorariosForBackend = (horarios: TimesInterface[]) => {
    const formattedHorarios: Record<string, string[][]> = {};

    horarios.forEach((horario) => {
      const { dia, start, end } = horario;

      if (!formattedHorarios[dia]) {
        formattedHorarios[dia] = [];
      }

      formattedHorarios[dia].push([start, end]);
    });

    return {  horarios: formattedHorarios };
  };
  const handleUpdate = async () => {
    try {
      // Validación de horarios
      if (horarios.length === 0) {
        showToast("error", "No hay horarios para guardar");
        return;
      }
  
      // Obtener usuario del localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        showToast("error", "No se encontró el usuario en el almacenamiento local");
        return;
      }
  
      // Parsear usuario y obtener token
      const parsedUser: UsuarioLocalStorage = JSON.parse(storedUser);
      const token = parseCookies()["session"];
  
      if (!token) {
        showToast("error", "No se encontró el token de autenticación");
        return;
      }
  
      // Formatear datos para el backend
      const formattedData = formatHorariosForBackend(horarios);
      console.log("Datos a enviar:", formattedData);
      console.log ("Token:", token);
      // Realizar la petición PUT
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/${parsedUser.idpsicologo}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formattedData),
        }
      );
  
      // Manejar la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del backend:", errorData);
        throw new Error(errorData.message || "Error al actualizar horarios");
      }
  
      const data = await response.json();
      console.log("Respuesta del backend:", data);
  
      showToast("success", "Horarios guardados correctamente");
      
      // Opcional: Resetear horarios después de guardar
      setHorarios([]);
      
    } catch (error) {
      console.error("Error al guardar horarios:", error);
      showToast(
        "error", 
        error instanceof Error 
          ? error.message 
          : "Error al guardar horarios"
      );
    }
  };

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
          type="time"
          step={3600}
          min="08:00"
          max="18:00"
          value={fecha.start}
          className="!text-[#634AE2] h-[43px]"
          onChange={handleTimeChange}
        />

        <Input
          name="end"
          label="Hora de fin"
          radius="full"
          step={3600}
          min="08:00"
          max="18:00"
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
          <>
            <ScrollShadow className="max-h-80 h-auto " hideScrollBar>
              {horarios.map((horario) => (
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
              ))}
            </ScrollShadow>
            <Button
              radius="full"
              onPress={handleUpdate}
              className="mx-auto text-white bg-purple-800/75 flex items-center"
            >
              Guardar horarios
            </Button>
          </>
        ) : (
          <p className="text-center text-gray-500 py-4">
            No hay horarios agregados
          </p>
        )}
      </div>
    </div>
  );
}
