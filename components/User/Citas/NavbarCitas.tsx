"use client";

import { useState} from "react";
import { Icons } from "@/icons";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
  Form,
  
} from "@heroui/react";
//import { Paciente, UsuarioLocalStorage } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "@/components/ToastStyle";

interface NavbarProps {
  filterValue: string;
  onSearchChange: (value?: string) => void;
  onClear: () => void;
  visibleColumns: Set<string>;
  setVisibleColumns: (columns: Set<string>) => void;
  columns: { name: string; uid: string; sortable?: boolean }[];
}
//const cookies = parseCookies();
//const token = cookies["session"];

/*export const PacienteGet = async (): Promise<Paciente[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}api/pacientes/all`,
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
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result || [];
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    throw error;
  }
};*/

export const Navbar: React.FC<NavbarProps> = ({
  filterValue,
  onSearchChange,
  onClear,
 
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
 // const [pacientes, setPacientes] = useState<Paciente[]>([]);
 // const [searchTerm, setSearchTerm] = useState("");
  //const [selectedPaciente, setSelectedPaciente] = useState<string | null>(null);
 // const [user, setUser] = useState<UsuarioLocalStorage | null>(null);
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

 /* useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const data = await PacienteGet();
        setPacientes(data);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
        showToast("error", "Error al cargar pacientes");
      }
    };
    fetchPacientes();
  }, []);*/

  /*useEffect(() => {
    const fetchUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    fetchUser();
  }, []);*/

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cookies = parseCookies();
      const token = cookies["session"];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/citas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear la cita");
      }

      showToast("success", "Cita guardada correctamente");
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
      onOpenChange();
    } catch (err) {
      console.error("Error:", err);
      showToast(
        "error",
        err instanceof Error ? err.message : "Hubo un error al guardar la cita"
      );
    }
  };

  return (
    <>
      <div className="flex w-full mt-8 z-40">
        <div className="bg-[#6364F4] w-full h-[8vh] flex flex-row justify-start items-center px-4">
           
            <div className="flex flex-row gap-4 w-full items-center pl-12">
            {/* <span
              className="text-[#634AE2] transition-colors"
              dangerouslySetInnerHTML={{
              __html: Icons.filter.replace(/<svg /, '<svg fill="#fff" '),
              }}
              style={{ width: "1.2em", height: "1.2em" }}
            />
            <Dropdown classNames={{ base: "bg-none" }}>
              <DropdownTrigger className="text-[#fff] font-light text-xl">
              <Button variant="bordered" className="border-none">
                Filtrar
              </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Ordenar por">
              {[
                { key: "genero", label: "Genero", ml: 127 },
                { key: "edad", label: "Edad", ml: 139 },
                { key: "FechaCreacion", label: "Fecha de creacion", ml: 37 },
                {
                key: "FechaUltimaCita",
                label: "Fecha de Ultima Cita",
                ml: 18,
                },
              ].map(({ key, label, ml }) => (
                <DropdownItem
                key={key}
                classNames={{
                  base: "rounded-2x1 text-base font-normal h-6 text-[#634AE2] data-[hover=true]:bg-[#9494F3] data-[hover=true]:text-white",
                  title: "ml-3 text-[16px]",
                }}
                >
                {label}
                <span
                  className={`inline-flex items-center ml-[${ml}px]`}
                  dangerouslySetInnerHTML={{
                  __html: Icons.arrow.replace(
                    /<svg /,
                    '<svg fill="#634AE2"'
                  ),
                  }}
                  style={{
                  width: "1.5em",
                  height: "1.5em",
                  transform: "rotate(-90deg)",
                  }}
                />
                </DropdownItem>
              ))}
              </DropdownMenu>
            </Dropdown>*/}

            <span
              className="text-[#fff] transition-colors pl-6"
              dangerouslySetInnerHTML={{
              __html: Icons.loup.replace(
                /<svg /,
                '<svg fill="currentColor" '
              ),
              }}
              style={{ width: "1.2em", height: "1.2em" }}
            />

            <Input
              type="text"
              placeholder="Buscar paciente"
              isClearable
              size="sm"
              radius="full"
              variant="bordered"
              className="rounded-full bg-[#EAEAFF] ml-4 w-48"
              classNames={{ input: "placeholder:text-[#9494F3]" }}
              value={filterValue}
              onClear={onClear}
              onValueChange={onSearchChange}
            />

            {/* 
            <div className="ml-auto flex items-center gap-4 mr-12">
              <span
              className="text-[#634AE2] transition-colors"
              dangerouslySetInnerHTML={{
              __html: Icons.plus.replace(/<svg /, '<svg fill="#634AE2"'),
              }}
              style={{
              background: "#fff",
              borderRadius: "9999px",
              borderColor: "#634AE2",
              }}
              />
              <button
              onClick={onOpen}
              className="text-[#fff] font-light text-xl border-1 rounded-full px-4"
              >
              Agregar nueva cita
              </button>
            </div>
            */}
            </div>
          
        </div>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <Form validationBehavior="native" onSubmit={handleSubmit}>
              {/*<Autocomplete
                radius="full"
                inputProps={{
                  className: "!text-[#634AE2]",
                }}
                placeholder="Buscar paciente por nombre o apellido"
               /* items={pacientes.filter((p) =>
                  `${p.nombre} ${p.apellido}`
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )}
                aria-label="Paciente"
                variant="faded"
                selectedKey={selectedPaciente}
                onInputChange={setSearchTerm}
                onSelectionChange={(key) => {
                  setSelectedPaciente(key?.toString() || null);
                 /* const paciente = pacientes.find(
                    (p) => p.idPaciente.toString() === key
                  );
                  if (paciente) {
                    setFormData((prev) => ({
                      ...prev,
                      paciente: `${paciente.nombre} ${paciente.apellido}`,
                    }));
                  }
                }}
              >
                {(paciente) => (
                  <AutocompleteItem
                    key={paciente.idPaciente}
                    textValue={`${paciente.nombre} ${paciente.apellido}`}
                  >
                    <div className="flex justify-between w-full">
                      <span>
                        {paciente.nombre} {paciente.apellido}
                      </span>
                    </div>
                  </AutocompleteItem>
                )}
              </Autocomplete>*/}

              <Textarea
                label="Motivo de consulta"
                name="motivo"
                value={formData.motivo}
                onChange={handleInputChange}
                placeholder="Escribe aquí el motivo de tu consulta"
                labelPlacement="outside"
                classNames={{
                  label: "!text-[#634AE2] font-bold text-center",
                  input: "!text-[#634AE2] font-light text-center",
                }}
              />
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  <Input
                    label="Estado de la cita"
                    name="estadoCita"
                    value={formData.estadoCita}
                    onChange={handleInputChange}
                    placeholder="Estado de la cita"
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                  <Input
                    label="Fecha de la cita"
                    name="fechaCita"
                    type="date"
                    value={formData.fechaCita}
                    onChange={handleInputChange}
                    placeholder="Fecha de la cita"
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                  <Input
                    label="Tipo de cita"
                    name="tipoCita"
                    value={formData.tipoCita}
                    onChange={handleInputChange}
                    placeholder="Tipo de cita"
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                  <Input
                    label="Canal de atracción"
                    name="canalAtraccion"
                    value={formData.canalAtraccion}
                    onChange={handleInputChange}
                    placeholder="Canal de atracción"
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2 flex flex-col gap-2">
                  <Input
                    label="Color de la cita"
                    name="colorCita"
                    type="color"
                    value={formData.colorCita}
                    onChange={handleInputChange}
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                  <Input
                    label="Hora de la cita"
                    name="horaCita"
                    type="time"
                    value={formData.horaCita}
                    onChange={handleInputChange}
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                  <Input
                    label="Duración"
                    name="duracion"
                    type="number"
                    min={30}
                    max={60}
                    step={15}
                    value={String(formData.duracion)}
                    onChange={handleInputChange}
                    placeholder="Duración"
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                  <Input
                    label="Etiqueta"
                    name="etiqueta"
                    value={formData.etiqueta}
                    onChange={handleInputChange}
                    placeholder="Etiqueta"
                    labelPlacement="outside"
                    classNames={{
                      label: "!text-[#634AE2] font-bold text-center",
                      input: "!text-[#634AE2] font-light text-center",
                    }}
                  />
                </div>
              </div>
              <ModalFooter className="mx-auto mt-4">
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
};
