// components/ModalCrearCita.tsx
"use client";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  DateValue,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { Paciente } from "@/interface";
import { useEffect, useState } from "react";
import { GetAllPacientes, token } from "@/app/apiRoutes";


interface CanaldeAtraccion {
  id: number;
  nombre: string;
}

const CanaldeAtraccion: CanaldeAtraccion[] = [
  { id: 1, nombre: "Facebook" },
  { id: 2, nombre: "Instagram" },
  { id: 3, nombre: "TikTok" },
  { id: 4, nombre: "YouTube" },
  { id: 5, nombre: "Threads" },
  { id: 6, nombre: "Referido" },
  { id: 7, nombre: "Publicidad" },
  { id: 8, nombre: "Otro" },
];

// Generar horas disponibles de 8:00 a 18:00 con intervalos de 1 hora
const generarHorasDisponibles = () => {
  const horas = [];
  for (let hora = 8; hora <= 18; hora++) {
    const horaFormateada = `${hora.toString().padStart(2, '0')}:00`;
    horas.push({
      value: horaFormateada,
      label: horaFormateada
    });
  }
  return horas;
};

const horasDisponibles = generarHorasDisponibles();

interface FormData {
  paciente: string;
  motivoConsulta: string;
  fecha:DateValue | string; // Cambiado a DateValue para manejar fechas
  tipoCita: number | null;
  canalAtraccion: number | null;
  horaCita: string;
  duracion: string;
  prioridad: number | null;
}

interface ModalCrearCitaProps {
  isOpen: boolean;
  onOpenChange: () => void;
  idCita?: number; // Nuevo prop opcional para edición
}

export default function ModalCrearCita({
  isOpen,
  onOpenChange,
  idCita,
}: ModalCrearCitaProps) {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonText, setButtonText] = useState("Guardar");

  const [formData, setFormData] = useState<FormData>({
    paciente: "",
    motivoConsulta: "",
    fecha: "",
    tipoCita: null,
    canalAtraccion: null,
    horaCita: "",
    duracion: "60",
    prioridad: null,
  });

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await GetAllPacientes();
        setPacientes(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
      }
    };

    fetchPacientes();
  }, []);

  const cargarCita = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/citas/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al cargar la cita");
      }
      const datos = await response.json();
      const data = datos.result;
      console.log("Datos de la cita:", data);
      setFormData({
        paciente: data.idPaciente?.toString() || "",
        motivoConsulta: data.motivo || "",
        fecha: data.fecha,
        tipoCita:
          data.idTipoCita ||
          (data.tipo === "Virtual" ? 2 : data.tipo === "Domicilio" ? 3 : 1),
        canalAtraccion:
          data.idCanal ||
          CanaldeAtraccion.find((c) => c.nombre === data.canal)?.id ||
          1,
        horaCita: data.hora_cita
          ? data.hora_cita.substring(0, 5)
          : data.hora
          ? data.hora.substring(0, 5)
          : "",
        duracion: data.duracion ? data.duracion.replace(/\D/g, "") : "60",
        prioridad:
          data.idEtiqueta ||
          (data.etiqueta === "Urgente"
            ? 2
            : data.etiqueta === "Normal"
            ? 3
            : 1),
      });
    } catch (error) {
      console.error("Error al cargar la cita:", error);
    }
  };

  useEffect(() => {
    if (idCita) {
      cargarCita(idCita);

      setIsEditing(true);
      setButtonText("Actualizar");
    } else {
      resetForm();
      setIsEditing(false);
      setButtonText("Guardar");
    }
  }, [idCita]);

  const onInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const enviarCita = async () => {
    try {
      const horaConSegundos =
        formData.horaCita.includes(":") &&
        formData.horaCita.split(":").length === 2
          ? `${formData.horaCita}:00`
          : formData.horaCita;

      const dataToSend = {
        idPaciente: parseInt(formData.paciente),
        motivo_Consulta: formData.motivoConsulta,
        fecha_cita: formData.fecha,
        hora_cita: horaConSegundos,
        idTipoCita: formData.tipoCita,
        idCanal: formData.canalAtraccion,
        idEtiqueta: formData.prioridad,
        duracion: parseInt(formData.duracion),
      };

      const method = isEditing ? "PUT" : "POST";
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}api/citas/${idCita}`
        : `${process.env.NEXT_PUBLIC_API_URL}api/citas`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          isEditing
            ? "Cita actualizada correctamente"
            : "Cita creada correctamente"
        );
        resetForm();
        window.location.reload();
        onOpenChange();
      } else {
        alert(
          `Error al ${isEditing ? "actualizar" : "crear"} la cita: ` +
            (result.message || "Error desconocido")
        );
      }
    } catch (error) {
      alert("Error de conexión al servidor");
    }
  };

  const handleSubmit = () => {
    if (!formData.paciente || !formData.motivoConsulta || !formData.horaCita) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }

    if (!formData.fecha) {
      alert("Por favor, seleccione la fecha de la cita");
      return;
    }

    enviarCita();
  };

  const resetForm = () => {
    setFormData({
      paciente: "",
      motivoConsulta: "",
      fecha: "",
      tipoCita: 1,
      canalAtraccion: 1,
      horaCita: "",
      duracion: "60",
      prioridad: 1,
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody>
          <Form validationBehavior="native">
            <h1 className="w-full font-semibold text-[#634AE2] text-center">
              Nombre del paciente <span className="text-red-500">*</span>
            </h1>
            <Autocomplete
              aria-label="Selecciona un paciente"
              labelPlacement="outside"
              isRequired
              placeholder="Buscar paciente"
              selectedKey={formData.paciente}
              classNames={{
                base: "!text-[#634AE2] font-bold text-center mx-auto w-full",
                popoverContent: "!text-[#634AE2] font-light text-center",
              }}
              onSelectionChange={(key) =>
                onInputChange("paciente", key as string)
              }
            >
              {pacientes.map((paciente) => (
                <AutocompleteItem
                  classNames={{
                    title:
                      "!text-[#634AE2] font-bold text-center mx-auto w-full",
                    description: "!text-[#634AE2] font-light text-center",
                  }}
                  key={paciente.idPaciente}
                  textValue={paciente.nombre}
                >
                  {paciente.nombre}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <Textarea
              label="Motivo de consulta"
              placeholder="Escribe aquí el motivo de tu consulta"
              labelPlacement="outside"
              min={10}
              max={500}
              isRequired
              rows={3}
              value={formData.motivoConsulta}
              onChange={(e) => onInputChange("motivoConsulta", e.target.value)}
              classNames={{
                label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
                input: "!text-[#634AE2] font-light text-center",
                errorMessage: "!text-[#634AE2] font-light text-center",
                mainWrapper: "flex flex-col items-center",
              }}
            />

            <div className="flex flex-col w-full md:flex-row gap-6">
              <div className="w-full md:w-1/2 gap-y-6">
                <label className="text-sm block mb-1 !text-[#634AE2] font-bold text-center mx-auto w-full">
                  Fecha de la cita <span className="text-red-500">*</span>
                </label>
                <DatePicker
                  aria-label="Fecha de la cita"
                  labelPlacement="outside"
                  isRequired
                  variant="faded"
                  minValue={today(getLocalTimeZone())}
                  maxValue={today(getLocalTimeZone()).add({ months: 10 })}
                  showMonthAndYearPickers
                  radius="full"
                  value={
                    formData.fecha
                      ? (parseDate(formData.fecha) as DateValue|| null)
                      : undefined
                  }
                  onChange={(date) => {
                    if (date) {
                      onInputChange("fecha", date.toString());
                    }
                  }}
                  classNames={{
                    label: "!text-[#634AE2]",
                    inputWrapper: "border-2 border-[#634AE2] h-[42px]",
                    base: "!mt-0.5",
                  }}
                />

                <Select
                  label="Tipo de cita"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Tipo de cita"
                  selectedKeys={
                    formData.tipoCita ? [formData.tipoCita.toString()] : []
                  }
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    onInputChange(
                      "tipoCita",
                      selectedKey ? parseInt(selectedKey) : null
                    );
                  }}
                  classNames={{
                    label:
                      "!text-[#634AE2] font-bold text-center mx-auto w-full",
                    errorMessage: "!text-[#634AE2] font-light text-center",
                    mainWrapper: "flex flex-col items-center",
                  }}
                >
                  <SelectItem textValue="Presencial" key="1">
                    Presencial
                  </SelectItem>
                  <SelectItem textValue="Virtual" key="2">
                    Virtual
                  </SelectItem>
                  <SelectItem textValue="Domicilio" key="3">
                    Domicilio
                  </SelectItem>
                </Select>

                <Select
                  label="Canal de atracción"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Canal de atracción"
                  selectedKeys={
                    formData.canalAtraccion
                      ? [formData.canalAtraccion.toString()]
                      : []
                  }
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    onInputChange(
                      "canalAtraccion",
                      selectedKey ? parseInt(selectedKey) : null
                    );
                  }}
                  classNames={{
                    label:
                      "!text-[#634AE2] font-bold text-center mx-auto w-full",
                    errorMessage: "!text-[#634AE2] font-light text-center",
                    mainWrapper: "flex flex-col items-center",
                  }}
                >
                  {CanaldeAtraccion.map((canal) => (
                    <SelectItem
                      textValue={canal.nombre}
                      key={canal.id.toString()}
                    >
                      {canal.nombre}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="w-full md:w-1/2">
                <Select
                  label="Hora de la cita"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Seleccionar hora"
                  selectedKeys={formData.horaCita ? [formData.horaCita] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    onInputChange("horaCita", selectedKey || "");
                  }}
                  classNames={{
                    label:
                      "!text-[#634AE2] font-bold text-center mx-auto w-full",
                    errorMessage: "!text-[#634AE2] font-light text-center",
                    mainWrapper: "flex flex-col items-center",
                  }}
                >
                  {horasDisponibles.map((hora) => (
                    <SelectItem
                      textValue={hora.label}
                      key={hora.value}
                    >
                      {hora.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  isReadOnly
                  label="Duración"
                  labelPlacement="outside"
                  placeholder="Duración"
                  type="number"
                  value={formData.duracion}
                  classNames={{
                    label:
                      "!text-[#634AE2] font-bold text-center mx-auto w-full",
                    input: "!text-[#634AE2] font-light text-center",
                    errorMessage: "!text-[#634AE2] font-light text-center",
                    mainWrapper: "flex flex-col items-center",
                  }}
                />

                <Select
                  label="Prioridad"
                  labelPlacement="outside"
                  placeholder="Prioridad"
                  isRequired
                  selectedKeys={
                    formData.prioridad ? [formData.prioridad.toString()] : []
                  }
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    onInputChange(
                      "prioridad",
                      selectedKey ? parseInt(selectedKey) : null
                    );
                  }}
                  classNames={{
                    label:
                      "!text-[#634AE2] font-bold text-center mx-auto w-full",
                    errorMessage: "!text-[#634AE2] font-light text-center",
                    mainWrapper: "flex flex-col items-center",
                  }}
                >
                  <SelectItem textValue="Importante" key="1">
                    Importante
                  </SelectItem>
                  <SelectItem textValue="Urgente" key="2">
                    Urgente
                  </SelectItem>
                  <SelectItem textValue="Normal" key="3">
                    Normal
                  </SelectItem>
                </Select>
              </div>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter className="mx-auto">
          <Button
            radius="full"
            className="bg-[#634AE2] text-white font-light"
            onPress={handleSubmit}
          >
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}