// CalendarioMain.tsx (versión simplificada)
"use client";
import { useEffect, useState } from "react";
import CerrarSesion from "@/components/CerrarSesion";
import { Button, useDisclosure } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import Week from "./SelectorDate";
import Calendario from "./Calendar";
import { GetAllPacientes, token } from "@/app/apiRoutes";
import { Paciente } from "@/interface";
import ModalCrearCita from "./Modalcita";


export default function CalendarioMain() {
  const [vistaActual, setVistaActual] = useState("calendario");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = useState({
    paciente: "",
    motivoConsulta: "",
    fechaNacimiento: "",
    tipoCita: null,
    canalAtraccion: null,
    horaCita: "",
    duracion: "60",
    prioridad: null
  });

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await GetAllPacientes();
      setPacientes(data);
    };
    fetchPacientes();
  }, []);

  const Fecha = today(getLocalTimeZone());
  const nombreMes = new Date(Fecha.year, Fecha.month - 1).toLocaleString("es-ES", {
    month: "long",
  });

  const cambiarVista = (vista: string) => {
    setVistaActual(vista);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | number | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const enviarCita = async () => {
    try {
      const horaConSegundos = formData.horaCita.includes(':') && formData.horaCita.split(':').length === 2 
        ? `${formData.horaCita}:00` 
        : formData.horaCita;
    
      const dataToSend = {
        idPaciente: parseInt(formData.paciente), 
        motivo_Consulta: formData.motivoConsulta,
        fecha_cita: formData.fechaNacimiento, 
        hora_cita: horaConSegundos,
        idTipoCita: formData.tipoCita,
        idCanal: formData.canalAtraccion,
        idEtiqueta: formData.prioridad,
        duracion: parseInt(formData.duracion),
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/citas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(dataToSend)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Cita creada correctamente');
        resetForm();
        onOpenChange();
      } else {
        alert('Error al crear la cita: ' + (result.message || 'Error desconocido'));
      }
    } catch (error) {
      alert('Error de conexión al servidor');
    }
  };

  const handleSubmit = () => {
    if (!formData.paciente || !formData.motivoConsulta || !formData.horaCita) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }
    
    if (!formData.fechaNacimiento) {
      alert("Por favor, seleccione la fecha de la cita");
      return;
    }
    
    enviarCita();
  };

  const resetForm = () => {
    setFormData({
      paciente: "",
      motivoConsulta: "",
      fechaNacimiento: "",
      tipoCita: null,
      canalAtraccion: null,
      horaCita: "",
      duracion: "60",
      prioridad: null
    });
  };

  return (
    <>
      <div className="flex justify-between w-full mt-10 mb-6">
        <div className="flex flex-col md:flex-row justify-evenly space-x-5">
          <h1 className="flex items-center font-bold text-[32px] leading-[40px] ml-11 text-[#634AE2]">
            Calendario de citas
          </h1>
          <Button
            onPress={onOpen}
            className="bg-[#634AE2] rounded-full px-4 p text-white font-light"
          >
            Nueva cita
          </Button>
        </div>
        <CerrarSesion />
      </div>
      
      <div className="w-full h-16 bg-[#6364F4] items-center justify-start flex px-8">
        <div className="flex gap-2 items-center w-full max-w-[230px]">
          <Button
            radius="full"
            className={`text-[16px] leading-[20px] ${
              vistaActual === "calendario"
                ? "text-[#634AE2] bg-white"
                : "bg-transparent border-1 text-background font-light"
            }`}
            onPress={() => cambiarVista("calendario")}
          >
            Calendario
          </Button>
          <Button
            radius="full"
            className={`text-[16px] leading-[20px] ${
              vistaActual === "horarios"
                ? "text-[#634AE2] bg-white"
                : "bg-transparent border-1 text-background font-light"
            }`}
            onPress={() => cambiarVista("horarios")}
          >
            Mis Horarios
          </Button>
        </div>
        <div className="text-white font-semibold text-2xl hidden md:block mx-auto">
          {nombreMes[0].toUpperCase() + nombreMes.slice(1)} de {Fecha.year}
        </div>
      </div>

      {vistaActual === "calendario" ? <Calendario /> : <Week />}

      <ModalCrearCita
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        pacientes={pacientes}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}