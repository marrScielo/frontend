"use client";
import { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  type View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip,
} from "@heroui/react";
import { CitasPendientes } from "@/interface";
import { CitasGetAll } from "@/app/apiRoutes";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    es,
  },
});

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource?: any;
}

export default function Calendario() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentView, setCurrentView] = useState<View>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const convertirCitasAEventos = (citas: CitasPendientes[]): CalendarEvent[] => {
    return citas.map((cita) => {
      const fechaInicio = new Date(cita.fecha_inicio);
      const duracionMinutos = parseInt(cita.duracion.replace(/\D/g, '')) || 60;
      const fechaFin = new Date(fechaInicio.getTime() + (duracionMinutos * 60 * 1000));

      return {
        id: cita.idCita,
        title: `${cita.paciente} - ${cita.motivo}`,
        start: fechaInicio,
        end: fechaFin,
        resource: {
          codigo: cita.codigo,
          estado: cita.estado,
          idPaciente: cita.idPaciente,
          idPsicologo: cita.idPsicologo,
          duracion: cita.duracion,
          paciente: cita.paciente,
          motivo: cita.motivo
        }
      };
    });
  };

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const citas = await CitasGetAll();
        const eventosCalendario = convertirCitasAEventos(citas);
        setEvents(eventosCalendario);
      } catch (error) {
        console.error("Error fetching citas:", error);
      }
    };

    fetchCitas();
  }, []);

  const eventStyleGetter = (event: CalendarEvent) => {
    const estado = event.resource?.estado;
    let backgroundColor = '#634AE2';
    
    switch (estado) {
      case 'Pendiente':
        backgroundColor = '#FFA500';
        break;
      case 'Confirmada':
        backgroundColor = '#28A745';
        break;
      case 'Cancelada':
        backgroundColor = '#DC3545';
        break;
      case 'Completada':
        backgroundColor = '#6C757D';
        break;
      default:
        backgroundColor = '#634AE2';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    onOpen();
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'Pendiente':
        return 'warning';
      case 'Confirmada':
        return 'success';
      case 'Cancelada':
        return 'danger';
      case 'Completada':
        return 'default';
      default:
        return 'primary';
    }
  };

  const formatearFechaHora = (fecha: Date) => {
    return format(fecha, "dd/MM/yyyy 'a las' HH:mm", { locale: es });
  };

  return (
    <>
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
          onView={setCurrentView}
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          defaultView={Views.MONTH}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-[#634AE2]">
                  Detalles de la Cita
                </h2>
                <p className="text-sm text-gray-500">
                  Código: {selectedEvent?.resource?.codigo}
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#634AE2] mb-2">
                      👤 Información del Paciente
                    </h3>
                    <p className="text-lg font-medium">
                      {selectedEvent?.resource?.paciente}
                    </p>
                    <p className="text-sm text-gray-600">
                      ID: {selectedEvent?.resource?.idPaciente}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#634AE2]">Estado:</span>
                    <Chip 
                      color={getEstadoColor(selectedEvent?.resource?.estado)}
                      variant="flat"
                      size="md"
                    >
                      {selectedEvent?.resource?.estado}
                    </Chip>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#634AE2] mb-2">
                      📋 Motivo de Consulta
                    </h3>
                    <p className="bg-blue-50 p-3 rounded-lg text-gray-800">
                      {selectedEvent?.resource?.motivo}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-[#634AE2] mb-2">
                        📅 Fecha y Hora de Inicio
                      </h3>
                      <p className="text-gray-800">
                        {selectedEvent && formatearFechaHora(selectedEvent.start)}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#634AE2] mb-2">
                        ⏱️ Duración
                      </h3>
                      <p className="text-gray-800">
                        {selectedEvent?.resource?.duracion}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#634AE2] mb-2">
                      🏁 Hora de Finalización
                    </h3>
                    <p className="text-gray-800">
                      {selectedEvent && formatearFechaHora(selectedEvent.end)}
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  color="danger" 
                  variant="light" 
                  onPress={onClose}
                  className="font-medium"
                >
                  Cerrar
                </Button>
                <Button 
                  className="bg-[#634AE2] text-white font-medium"
                  onPress={() => {
                    console.log('Editar cita:', selectedEvent?.id);
                    onClose();
                  }}
                >
                  Editar Cita
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
