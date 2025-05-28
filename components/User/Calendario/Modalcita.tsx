// components/ModalCrearCita.tsx
"use client";
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
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
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

interface ModalCrearCitaProps {
  isOpen: boolean;
  onOpenChange: () => void;
  pacientes: Paciente[];
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string | number | null) => void;
  onSubmit: () => void;
}

export default function ModalCrearCita({
  isOpen,
  onOpenChange,
  pacientes,
  formData,
  onInputChange,
  onSubmit,
}: ModalCrearCitaProps) {

    



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
              onSelectionChange={(key) => onInputChange("paciente", key as string)}
            >
              {pacientes.map((paciente) => (
                <AutocompleteItem
                  classNames={{
                    title: "!text-[#634AE2] font-bold text-center mx-auto w-full",
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
                  onChange={(date: any) => {
                    if (date) {
                      onInputChange("fechaNacimiento", date.toString());
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
                    onInputChange("tipoCita", selectedKey ? parseInt(selectedKey) : null);
                  }}
                  classNames={{
                    label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
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
                    onInputChange("canalAtraccion", selectedKey ? parseInt(selectedKey) : null);
                  }}
                  classNames={{
                    label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
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
                  onChange={(e) => onInputChange("horaCita", e.target.value)}
                  classNames={{
                    label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
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
                    label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
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
                    onInputChange("prioridad", selectedKey ? parseInt(selectedKey) : null);
                  }}
                  classNames={{
                    label: "!text-[#634AE2] font-bold text-center mx-auto w-full",
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
            onPress={onSubmit}
          >
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}