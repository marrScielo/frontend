"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DatosPacienteProps, Paciente } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "@/components/ToastStyle";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

const DatosPaciente: React.FC<DatosPacienteProps> = ({ idPaciente }) => {
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState<Partial<Paciente>>({});

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
        setFormData(data.result);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error al obtener el paciente");
    }
  };

  const HandleUpdatePaciente = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/pacientes/${idPaciente}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setPaciente(data.result);
        onClose();
        showToast("success", "Paciente actualizado correctamente");
        HandleGetPaciente(idPaciente);
      } else {
        showToast("error", data.message || "Error al actualizar");
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error de conexión");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (idPaciente) HandleGetPaciente(idPaciente);
  }, [idPaciente]);

  return (
    <div>
      {/* Vista del paciente */}
      <div className="bg-background rounded-3xl p-8 flex justify-around mt-2 w-full h-full relative">
        <div className="text-[#634AE2] font-bold flex flex-col gap-y-5">
          <div className="flex gap-2">
            <div className="w-28">Nombre</div>
            <div className="font-normal">{paciente?.nombre}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Apellido</div>
            <div className="font-normal">{paciente?.apellido}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Género</div>
            <div className="font-normal">{paciente?.genero}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Fecha de Nacimiento</div>
            <div className="font-normal">
              {paciente
                ? new Date(paciente.fecha_nacimiento).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }
                  )
                : "Fecha no disponible"}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Ocupación</div>
            <div className="font-normal">{paciente?.ocupacion}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Estado Civil</div>
            <div className="font-normal">{paciente?.estadoCivil}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">DNI</div>
            <div className="font-normal">{paciente?.DNI}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Celular</div>
            <div className="font-normal">{paciente?.celular}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Correo</div>
            <div className="font-normal">{paciente?.correo}</div>
          </div>
          <div className="flex gap-2">
            <div className="w-28">Dirección</div>
            <div className="font-normal">{paciente?.direccion}</div>
          </div>
        </div>

        <div className="mt-2 ml-11">
          <button
            onClick={onOpen}
            className={cn(
              "bg-transparent text-[#634AE2] border-[#634AE2] border-1 rounded-full py-2 px-4 mt-4 hover:bg-[#634AE2] hover:text-[#fff]"
            )}
          >
            Editar
          </button>
        </div>
      </div>

      {/* Modal corregido */}
      {/* Modal corregido y reorganizado */}
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        placement="center"
        size="3xl"
      >
        <ModalContent className="z-[9999] rounded-xl">
          <ModalHeader className="text-2xl font-bold text-[#634AE2] border-b pb-4">
            Editar Paciente: {paciente?.nombre} {paciente?.apellido}
          </ModalHeader>

          <ModalBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-4">
              {/* Nombre y Apellido */}
              <Input
                label="Nombre"
                labelPlacement="outside"
                value={formData?.nombre || ""}
                onChange={handleInputChange}
                name="nombre"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />

              <Input
                label="Apellido"
                labelPlacement="outside"
                value={formData?.apellido || ""}
                onChange={handleInputChange}
                name="apellido"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />

              {/* DNI y Fecha de nacimiento */}
              <Input
                label="DNI"
                labelPlacement="outside"
                value={formData?.DNI || ""}
                onChange={handleInputChange}
                name="DNI"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />

              <Input
                type="date"
                label="Fecha de Nacimiento"
                labelPlacement="outside"
                value={
                  formData?.fecha_nacimiento
                    ? new Date(formData.fecha_nacimiento)
                        .toISOString()
                        .split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
                name="fecha_nacimiento"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />

              {/* Correo y Celular */}
              <Input
                type="email"
                label="Correo"
                labelPlacement="outside"
                value={formData?.correo || ""}
                onChange={handleInputChange}
                name="correo"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />
              
              <Input
                label="Celular"
                labelPlacement="outside"
                value={formData?.celular || ""}
                onChange={handleInputChange}
                name="celular"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />

              {/* Género y Dirección */}
              <div className="flex flex-col gap-2">
                <label className="text-[#634AE2] font-medium">Género</label>
                <select
                  name="genero"
                  value={formData?.genero || ""}
                  onChange={handleInputChange}
                  className="border-2 border-[#634AE2] rounded-md p-2 text-[#634AE2]"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <Input
                label="Dirección"
                labelPlacement="outside"
                value={formData?.direccion || ""}
                onChange={handleInputChange}
                name="direccion"
                classNames={{
                  label: "text-[#634AE2] font-medium",
                  inputWrapper: "border-2 border-[#634AE2]",
                  input: "text-[#634AE2]",
                }}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="light"
              onPress={onClose}
              className="text-[#634AE2] hover:bg-[#634AE2]/10"
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              onPress={HandleUpdatePaciente}
              className="bg-[#634AE2] text-white hover:bg-[#4a36b3]"
            >
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DatosPaciente;
