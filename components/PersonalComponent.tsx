"use client";
import type { FormData } from "@/interface";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons/iconsvg";
import { getLocalTimeZone, today } from "@internationalized/date";

export default function PersonalComponent() {
  const [currentView, setCurrentView] = React.useState<"form" | "data">("form");
  const [formData, setFormData] = React.useState<FormData>({
    name: "",
    lastname: "",
    birthdate: today(getLocalTimeZone()),
    edad: 0,
    sex: "",
    country: "",
    mail: "",
    password: "",
  });

  const handleNext = (data: any) => {
    setFormData(data); // Guarda los datos del formulario
    setCurrentView("data"); // Cambia a la vista de datos
  };

  const handleBack = () => {
    setCurrentView("form"); // Vuelve a la vista del formulario
  };

  return (
    <div className="text-[#634AE2] h-auto p-10 items-center bg-white rounded-3xl ">
      {currentView === "form" ? (
        <PersonalForm onNext={handleNext} initialFormData={formData} />
      ) : (
        <DataView formData={formData} onBack={handleBack} />
      )}
    </div>
  );
}

export const PersonalForm = ({
  onNext,
  initialFormData,
}: {
  onNext: (data: FormData) => void;
  initialFormData: FormData;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    onNext(formData);
  };

  return (
    <>
      <h1 className="font-semibold text-center mb-5 text-4xl">
        Ingrese sus datos
      </h1>
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 w-auto lg:w-[700px]   gap-10">
          <div className="flex flex-col space-y-10">
            <Input
              label="Nombre"
              labelPlacement="outside"
              radius="full"
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]",
                input: "placeholder:!text-[#634AE2] w-full",
              }}
              placeholder="ingrese su nombre"
              type="text"
              isRequired
              value={formData.name}
              variant="faded"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <div className="flex items-center gap-2 !mt-4 !pt-0">
              <span className="text-[#634AE2] text-sm">
                Fecha de nacimiento
              </span>
              <span className="text-danger">*</span>
            </div>

            <DatePicker
              aria-label="Fecha de nacimiento"
              labelPlacement="outside"
              isRequired
              variant="faded"
              maxValue={today(getLocalTimeZone())}
              showMonthAndYearPickers
              radius="full"
              classNames={{
                label: "!text-[#634AE2]",
                base: "!mt-0.5",
              }}
            />

            <Select
              label="Género"
              labelPlacement="outside"
              isRequired
              radius="full"
              variant="faded"
              selectedKeys={[formData.sex]}
              classNames={{
                label: "!text-[#634AE2]",
                trigger: "border-2 border-[#634AE2]",
                value: "!text-[#634AE2]",
              }}
              placeholder="Seleccione su género"
              onChange={(e) =>
                setFormData({ ...formData, sex: e.target.value })
              }
            >
              <SelectItem
                className="text-[#634AE2]"
                key="femenino"
                value="femenino"
              >
                Femenino
              </SelectItem>
              <SelectItem
                className="text-[#634AE2]"
                key="masculino"
                value="masculino"
              >
                Masculino
              </SelectItem>
              <SelectItem className="text-[#634AE2]" key="otros" value="otros">
                Otros
              </SelectItem>
            </Select>
            <Input
              label="E-mail"
              labelPlacement="outside"
              isRequired
              radius="full"
              value={formData.mail}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]", // Solo controla el borde
                input: "placeholder:!text-[#634AE2]", // Aquí es donde controlas el color del placeholder
              }}
              placeholder="ingrese su email"
              type="email"
              variant="faded"
              onChange={(e) =>
                setFormData({ ...formData, mail: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col space-y-10">
            <Input
              label="Apellido"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              value={formData.lastname}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]", // Solo controla el borde
                input: "placeholder:!text-[#634AE2]", // Aquí es donde controlas el color del placeholder
              }}
              className="w-full   text-[#634AE2]"
              isRequired
              placeholder="ingrese su apellido"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
            <Input
              label="Edad"
              labelPlacement="outside"
              value={formData.edad.toString()}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]", // Solo controla el borde
                input: "placeholder:!text-[#634AE2]", // Aquí es donde controlas el color del placeholder
              }}
              placeholder="ingrese su edad"
              type="number"
              isRequired
              radius="full"
              variant="faded"
              onChange={(e) =>
                setFormData({ ...formData, edad: parseInt(e.target.value) })
              }
            />

            <Input
              label="Pais"
              labelPlacement="outside"
              value={formData.country}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]", // Solo controla el borde
                input: "placeholder:!text-[#634AE2]", // Aquí es donde controlas el color del placeholder
              }}
              placeholder="ingrese su pais"
              type="text"
              isRequired
              radius="full"
              variant="faded"
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
            />
            <Input
              name="password"
              isRequired
              radius="full"
              label="Contraseña"
              labelPlacement="outside"
              value={formData.password}
              placeholder="ingrese su contraseña"
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]", // Solo controla el borde
                input: "placeholder:!text-[#634AE2]", // Aquí es donde controlas el color del placeholder
              }}
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              variant="faded"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Button
            radius="full"
            type="submit"
            className="max-w-44 w-full mt-10 bg-[#634AE2] text-white"
          >
            Siguiente
          </Button>
        </div>
      </Form>
    </>
  );
};

const ImageUploader: React.FC = () => {
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Convertir la imagen a WebP
    const webpImage = await convertImageToWebP(file);

    // Convertir la imagen WebP a Base64
    const base64 = await convertToBase64(webpImage);
    setBase64Image(base64);

    // Enviar la imagen al backend
    // sendImageToBackend(base64);
  };

  const convertImageToWebP = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        // Convertir la imagen a WebP
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Error al convertir la imagen a WebP"));
            }
          },
          "image/webp",
          0.8
        ); // Calidad del 80%
      };

      img.onerror = () => {
        reject(new Error("Error al cargar la imagen"));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const convertToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Error al convertir a Base64"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Error al leer el archivo"));
      };
      reader.readAsDataURL(blob);
    });
  };

  const sendImageToBackend = async (base64: string) => {
    try {
      const response = await fetch(
        "https://ik.imagekit.io/contigovoy/rest/of/the/path/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: base64 }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar la imagen al backend");
      }

      const data = await response.json();
      console.log("Imagen enviada con éxito:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative border-2 border-[#634AE2] rounded-lg h-36 w-full flex justify-center items-center cursor-pointer overflow-hidden">
      {base64Image ? (
        <img
          src={base64Image}
          alt="Imagen seleccionada"
          className="w-full h-full object-cover"
        />
      ) : (
        <Plus width={40} height={40} strokeWidth={2} color="#634AE2" />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 w-42  h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

interface formDataComplete extends FormData {
  image: string;
  introduction: string;
  experience: number;
  specialties: string[];
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const backendSentUser = async (formDataComplete: formDataComplete[]) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `{process.env.NEXT_PUBLIC_BACKEND_URL}/psicologos/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ formDataComplete }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al enviar la imagen al backend");
      }
    } catch (error) {
      throw new Error("Error al enviar la imagen al backend");
    }
  };
};

export const DataView = ({
  formData,
  onBack,
}: {
  formData: any;
  onBack: any;
}) => {
  const [formDataComplete, setFormDataComplete] =
    React.useState<formDataComplete>({
      name: formData.name,
      lastname: formData.lastname,
      birthdate: formData.birthdate,
      edad: formData.edad,
      sex: formData.sex,
      country: formData.country,
      mail: formData.mail,
      password: formData.password,
      image: "",
      introduction: "",
      experience: 0,
      specialties: [],
    });

  const [isInvalid, setIsInvalid] = React.useState(true);
  const [isInvalide, setIsInvalide] = React.useState(true);
  return (
    <>
      <div className="relative flex flex-col items-center mb-10">
        <h1 className="font-semibold text-4xl">¡Hola {formData.name}!</h1>
        <small>Ya casi acabamos</small>
      </div>
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 grid-rows-5 gap-10">
          <div className="col-span-2 row-span-2">
            <h3 className="font-bold text-base">Foto</h3>
            <ImageUploader />
          </div>
          <div className="col-start-3  col-span-4 row-span-2  ">
            <Textarea
              isRequired
              classNames={{
                label: "!text-[#634AE2] font-bold text-base",
                inputWrapper:
                  "border-2 border-[#634AE2] bg-white w-full h-full",
                innerWrapper: "min-w-80 min-h-[120px]", // Asegura que el área de texto ocupe todo el espacio disponible
              }}
              onChange={(e) =>
                setFormDataComplete({
                  ...formDataComplete,
                  introduction: e.target.value,
                })
              }
              label="Introducción"
              labelPlacement="outside"
            />
          </div>

          <div className="col-span-3 row-start-3">
            <Input
              label="Experiencia"
              isRequired
              placeholder=" Experiencia en años"
              labelPlacement="outside"
              radius="full"
              onChange={(e) =>
                setFormDataComplete({
                  ...formDataComplete,
                  experience: parseInt(e.target.value),
                })
              }
              classNames={{
                label: "!text-[#634AE2] font-bold text-base",
                inputWrapper: "border-2 border-[#634AE2] bg-white",
              }}
              type="number"
            ></Input>
          </div>
          <div className="col-span-6 row-start-4 row-span-2">
            <CheckboxGroup
              isRequired
              orientation="vertical"
              description="Selecciona las especialidades que domina"
              isInvalid={isInvalid}
              label="Especialidades"
              classNames={{
                label: "!text-[#634AE2] font-bold text-base",
              }}
              onValueChange={(value) => {
                setIsInvalid(value.length < 1);
              }}
            >
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                  <Checkbox
                    defaultSelected
                    color="secondary"
                    classNames={{
                      label: "text-[#634AE2]", // Reemplaza el color placeholder
                    }}
                    value="cognitivo-conductual"
                  >
                    cognitivo-conductual
                  </Checkbox>
                  <Checkbox
                    classNames={{
                      label: "text-[#634AE2]", // Reemplaza el color placeholder
                    }}
                    color="secondary"
                    value="neuropsicologia"
                  >
                    Neuropsicología
                  </Checkbox>
                  <Checkbox
                    classNames={{
                      label: "text-[#634AE2]", // Reemplaza el color placeholder
                    }}
                    color="secondary"
                    value="psicoanalisis"
                  >
                    Psicoanálisis
                  </Checkbox>
                </div>
                <div className="flex flex-col w-1/2">
                  <Checkbox
                    color="secondary"
                    classNames={{
                      label: "text-[#634AE2]", // Reemplaza el color placeholder
                    }}
                    value="psicopedagogia"
                  >
                    Psicopedagogía
                  </Checkbox>
                  <Checkbox
                    color="secondary"
                    classNames={{
                      label: "text-[#634AE2]", // Reemplaza el color placeholder
                    }}
                    value="gestalt"
                  >
                    Gestalt humanista
                  </Checkbox>
                  <Checkbox
                    color="secondary"
                    classNames={{
                      label: "text-[#634AE2]", // Reemplaza el color placeholder
                    }}
                    value="racional-emotivo"
                  >
                    Racional-emotivo-conductual
                  </Checkbox>
                </div>
              </div>
            </CheckboxGroup>
          </div>
        </div>
        <div className="flex w-full justify-center gap-10">
          <Button
            radius="full"
            className="bg-white border-1 border-[#634AE2] text-[#634AE2]"
            onPress={onBack}
          >
            Retroceder
          </Button>
          <Button
            radius="full"
            type="submit"
            className="min-w-32 bg-[#634AE2] text-white"
          >
            Siguiente
          </Button>
        </div>
      </Form>
    </>
  );
};
