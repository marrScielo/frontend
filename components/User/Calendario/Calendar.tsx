"use client";
import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  type View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    es,
  },
});

export default function Calendario() {
  const [currentView, setCurrentView] = useState<View>(Views.MONTH); // 👈 Tipo explícito aquí
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      title: "Evento 1",
      start: new Date(2025, 3, 4),
      end: new Date(2025, 3, 4),
    },
    {
      title: "Evento 2",
      start: new Date(2025, 3, 6, 14, 0),
      end: new Date(2025, 3, 6, 15, 0),
    },
  ];

  return (
    <div
      className="mx-auto mt-3"
      style={{
        height: "90vh",
        width: "80vw",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="es"
        view={currentView}
        onView={setCurrentView} // ✅ ahora sí es del tipo correcto
        date={currentDate}
        onNavigate={(newDate) => setCurrentDate(newDate)}
        defaultView={Views.MONTH}
        messages={{
          allDay: "Todo el día",
          previous: "Anterior",
          next: "Siguiente",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "No hay eventos en este rango",
        }}
        className="bg-white text-[#634AE2]"
      />
    </div>
  );
}
