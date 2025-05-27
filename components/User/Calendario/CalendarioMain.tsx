"use client";
import { useEffect, useState } from "react";
import CerrarSesion from "@/components/CerrarSesion";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import Week from "./SelectorDate";
import Calendario from "./Calendar";
import { GetAllPacientes, token } from "@/app/apiRoutes";
import { Paciente } from "@/interface";

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


interface FormData {
  paciente: string;
  motivoConsulta: string;
  fechaNacimiento: string;
  tipoCita: number | null;
  canalAtraccion: number | null;
  horaCita: string;
  duracion: string;
  prioridad: number | null;
}

export default function CalendarioMain() {
  const [vistaActual, setVistaActual] = useState("calendario");
  const [pacientes, setPacientes] = useState<Paciente[]>([])

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await GetAllPacientes();
      setPacientes(data);
    };
    fetchPacientes();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    paciente: "",
    motivoConsulta: "",
    fechaNacimiento: "",
    tipoCita: null,
    canalAtraccion: null,
    horaCita: "",
    duracion: "60",
    prioridad: null
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


  const handleInputChange = (field: keyof FormData, value: string | number | null) => {
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
      hora_cita: horaConSegundos, // Usar la hora con segundos
      idTipoCita: formData.tipoCita,
      idCanal: formData.canalAtraccion,
      idEtiqueta: formData.prioridad,
      duracion: parseInt(formData.duracion),
    };

    console.log('Enviando datos al backend:', dataToSend);

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
      console.log('Cita creada exitosamente:', result);
      alert('Cita creada correctamente');
      resetForm();
      onOpenChange(); // Cerrar modal
    } else {
      console.error('Error del servidor:', result);
      alert('Error al crear la cita: ' + (result.message || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('Error de conexión al servidor');
  }
};
  // Función para manejar el submit del formulario
  const handleSubmit = () => {
    console.log("Datos del formulario:", formData);
    
    // Validación básica
    if (!formData.paciente || !formData.motivoConsulta || !formData.horaCita) {
      alert("Por favor, complete todos los campos obligatorios");
      return;
    }
    
    if (!formData.fechaNacimiento) {
      alert("Por favor, seleccione la fecha de la cita");
      return;
    }
    
    // Enviar al backend
    enviarCita();
  };

  // Función para limpiar el formulario
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <Form validationBehavior="native">
              <h1 className=" w-full font-semibold text-[#634AE2] text-center">
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
                  handleInputChange("paciente", key as string)
                }
              >
                {pacientes.map((paciente) => (
                  <AutocompleteItem
                  classNames={
                    {
                      title: "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      description: "!text-[#634AE2] font-light text-center",
                    }
                  }
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
                onChange={(e) => handleInputChange("motivoConsulta", e.target.value)}
                classNames={{
                  label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
                  input: "!text-[#634AE2] font-light text-center",
                  errorMessage: "!text-[#634AE2] font-light text-center",
                  mainWrapper: "flex flex-col items-center",
                }}
              />
              <div className="flex flex-col w-full md:flex-row gap-6 ">
                <div className="w-full md:w-1/2 gap-y-6 ">
                  <label
                    className=" text-sm  block mb-1
                  !text-[#634AE2] font-bold text-center mx-auto w-full "
                  >
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
                    onChange={(date: any) => {
                      if (date) {
                        handleInputChange("fechaNacimiento", date.toString());
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
                    selectedKeys={formData.tipoCita ? [formData.tipoCita.toString()] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      handleInputChange("tipoCita", selectedKey ? parseInt(selectedKey) : null);
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
                    selectedKeys={formData.canalAtraccion ? [formData.canalAtraccion.toString()] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      handleInputChange("canalAtraccion", selectedKey ? parseInt(selectedKey) : null);
                    }}
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  >
                    {CanaldeAtraccion.map((canal) => (
                      <SelectItem textValue={canal.nombre} key={canal.id.toString()}>
                        {canal.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="w-full md:w-1/2">
                  <Input
                    label="Hora de la cita"
                    labelPlacement="outside"
                    isRequired
                    placeholder="Hora de la cita"
                    type="time"
                    min="08:00"
                    max="18:00"
                    step={60}
                    value={formData.horaCita}
                    onChange={(e) => handleInputChange("horaCita", e.target.value)}
                    classNames={{
                      label:
                        "!text-[#634AE2] font-bold text-center mx-auto w-full",
                      input: "!text-[#634AE2] font-light text-center",
                      errorMessage: "!text-[#634AE2] font-light text-center",
                      mainWrapper: "flex flex-col items-center",
                    }}
                  />
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
                    selectedKeys={formData.prioridad ? [formData.prioridad.toString()] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      handleInputChange("prioridad", selectedKey ? parseInt(selectedKey) : null);
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
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}