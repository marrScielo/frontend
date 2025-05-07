"use client";
import { useState } from "react";
import CerrarSesion from "@/components/CerrarSesion";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import Week from "./SelectorDate";
import Calendario from "./Calendar";

export default function CalendarioMain() {
  const [vistaActual, setVistaActual] = useState("calendario");
  const [formData, setFormData] = useState({
    paciente: "",
    motivo: "",
    estadoCita: "",
    fechaCita: "",
    tipoCita: "",
    canalAtraccion: "",
    colorCita: "#FFA500",
    horaCita: "",
    duracion: 30,
    etiqueta: "",
  });

  const Fecha = today(getLocalTimeZone());
  const nombreMes = new Date(Fecha.year, Fecha.month - 1).toLocaleString(
    "es-ES",
    {
      month: "long",
    }
  );

  const cambiarVista = (vista: string) => {
    setVistaActual(vista);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Manejar cambio de datos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Enviar los datos al backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/citas", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la cita");
      }

      // Limpiar formulario
      setFormData({
        paciente: "",
        motivo: "",
        estadoCita: "",
        fechaCita: "",
        tipoCita: "",
        canalAtraccion: "",
        colorCita: "#FFA500",
        horaCita: "",
        duracion: 30,
        etiqueta: "",
      });

      // Aquí puedes agregar una notificación o alguna lógica adicional
      alert("Cita guardada correctamente");
    } catch (error) {
      console.error("Error al crear la cita:", error);
      alert("Hubo un error al guardar la cita");
    }
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <Form validationBehavior="native" onSubmit={handleSubmit}>
              <Input
                label="Paciente"
                labelPlacement="outside"
                placeholder="Nombre del paciente"
                name="paciente"
                value={formData.paciente}
                onChange={handleInputChange}
                classNames={{
                  label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
                  input: "!text-[#634AE2] font-light text-center",
                  errorMessage: "!text-[#634AE2] font-light text-center",
                  mainWrapper: "flex flex-col items-center",
                }}
              />
              <Textarea
                label="Motivo de consulta"
                placeholder="Escribe aquí el motivo de tu consulta"
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
                labelPlacement="outside"
                classNames={{
                  label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
                  input: "!text-[#634AE2] font-light text-center",
                  errorMessage: "!text-[#634AE2] font-light text-center",
                  mainWrapper: "flex flex-col items-center",
                }}
              />
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                  <Input
                    label="Estado de la cita"
                    labelPlacement="outside"
                    name="estadoCita"
                    value={formData.estadoCita}
                    onChange={handleInputChange}
                    placeholder="Estado de la cita"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                  <Input
                    label="Fecha de la cita"
                    labelPlacement="outside"
                    name="fechaCita"
                    value={formData.fechaCita}
                    onChange={handleInputChange}
                    placeholder="Fecha de la cita"
                    type="date"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                  <Input
                    label="Tipo de cita"
                    labelPlacement="outside"
                    name="tipoCita"
                    value={formData.tipoCita}
                    onChange={handleInputChange}
                    placeholder="Tipo de cita"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                  <Input
                    label="Canal de atracción"
                    labelPlacement="outside"
                    name="canalAtraccion"
                    value={formData.canalAtraccion}
                    onChange={handleInputChange}
                    placeholder="Canal de atracción"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    label="Color de la cita"
                    labelPlacement="outside"
                    name="colorCita"
                    value={formData.colorCita}
                    onChange={handleInputChange}
                    placeholder="Color de la cita"
                    type="color"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                  <Input
                    label="Hora de la cita"
                    labelPlacement="outside"
                    name="horaCita"
                    value={formData.horaCita}
                    onChange={handleInputChange}
                    placeholder="Hora de la cita"
                    type="time"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                  <Input
                    label="Duración"
                    labelPlacement="outside"
                    name="duracion"
                    value={String(formData.duracion)} // Convierte a string
                    onChange={handleInputChange}
                    placeholder="Duración"
                    type="number"
                    min={30}
                    max={60}
                    step={15}
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />

                  <Input
                    label="Etiqueta"
                    labelPlacement="outside"
                    name="etiqueta"
                    value={formData.etiqueta}
                    onChange={handleInputChange}
                    placeholder="Etiqueta"
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
                </div>
              </div>
              <ModalFooter className="mx-auto">
                <Button
                  radius="full"
                  className="bg-transparent border-1 text-[#B158FF] border-[#634AE2]"
                >
                  Modificar
                </Button>
                <Button
                  radius="full"
                  className="bg-transparent text-[#F26767] border-1 border-[#634AE2]"
                >
                  Borrar
                </Button>
                <Button
                  radius="full"
                  type="submit"
                  className="bg-[#634AE2] text-white font-light"
                >
                  Guardar
                </Button>
              </ModalFooter>
            </Form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
