"use client";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons/iconsvg";
import { FormDataAdmin } from "@/interface";
import { Button, DatePicker, DateValue, Form, Input } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import React, {  } from "react";
import { Plus } from "lucide-react";
import { convertImageToWebP, convertToBase64 } from "@/utils/convertir64";
import { useState } from "react";
import { token } from "@/app/apiRoutes";
import showToast from "@/components/ToastStyle";

interface PersonalFormProps {
  onNext: (data: FormDataAdmin) => void;
  initialFormData: FormDataAdmin;
}

export const PersonalForm = ({
  onNext,
  initialFormData,
}: PersonalFormProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [formDataAdmin, setFormDataAdmin] =
    React.useState<FormDataAdmin>(initialFormData);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/administradores`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formDataAdmin }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      //const data = await response.json();
      onNext(formDataAdmin);
    } catch (error) {
      showToast("error", "Error al guardar los datos");
      console.error("Error:", error);
    }
  };

  const handleDateChange = (date: DateValue | null) => {
    if (!date) return;

    setFormDataAdmin((prev) => ({
      ...prev,
      fecha_nacimiento: `${String(date.day).padStart(2, "0")}/${String(
        date.month
      ).padStart(2, "0")}/${date.year}`,
    }));
  };

  

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const webpImage = await convertImageToWebP(file);
      const base64 = await convertToBase64(webpImage);
      setBase64Image(base64);
      setFormDataAdmin((prev) => ({ ...prev, imagen: base64 }));
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    }
  };

  return (
    <div className="text-[#634AE2] h-auto p-10 items-center bg-white rounded-3xl">
      <h1 className="font-semibold text-center mb-5 text-4xl">
        Registro de Administrador
      </h1>

      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-10 w-full">
          {/* Columna izquierda - Imagen */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative border-2 border-[#634AE2] rounded-lg h-48 w-40 flex justify-center items-center cursor-pointer overflow-hidden mt-6">
              {base64Image ? (
                <img
                  src={formDataAdmin.imagen}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Plus
                    width={40}
                    height={40}
                    strokeWidth={2}
                    color="#634AE2"
                  />
                  <span className="text-[#634AE2] text-sm mt-1">
                    Subir foto
                  </span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Columna derecha - Formulario */}
          <div className="w-full md:w-2/3">
            {/* Sección de Nombre y Apellido */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Nombre"
                labelPlacement="outside"
                radius="full"
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                placeholder="Ingrese su nombre"
                type="text"
                isRequired
                value={formDataAdmin.name}
                variant="faded"
                onChange={(e) =>
                  setFormDataAdmin({
                    ...formDataAdmin,
                    name: e.target.value,
                  })
                }
              />

              <Input
                label="Apellido"
                labelPlacement="outside"
                radius="full"
                variant="faded"
                value={formDataAdmin.apellido}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                isRequired
                placeholder="Ingrese su apellido"
                type="text"
                onChange={(e) =>
                  setFormDataAdmin({
                    ...formDataAdmin,
                    apellido: e.target.value,
                  })
                }
              />
            </div>

            {/* Sección de Email y Contraseña */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="E-mail"
                labelPlacement="outside"
                isRequired
                radius="full"
                value={formDataAdmin.email}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                placeholder="ejemplo@mail.com"
                type="email"
                variant="faded"
                onChange={(e) =>
                  setFormDataAdmin({
                    ...formDataAdmin,
                    email: e.target.value,
                  })
                }
              />

              <Input
                name="password"
                isRequired
                radius="full"
                label="Contraseña"
                minLength={8}
                labelPlacement="outside"
                value={formDataAdmin.password}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                placeholder="Ingrese su contraseña"
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-xl text-[#634AE2]" />
                    ) : (
                      <EyeFilledIcon className="text-xl text-[#634AE2]" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                variant="faded"
                onChange={(e) =>
                  setFormDataAdmin({
                    ...formDataAdmin,
                    password: e.target.value,
                  })
                }
              />
            </div>

            {/* Sección de Fecha de Nacimiento */}
            <div className="mb-6">
              <label className="text-[#634AE2] text-sm font-medium block mb-1">
                Fecha de nacimiento
              </label>
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
                  inputWrapper: "border-2 border-[#634AE2] h-[42px]",
                  base: "!mt-0.5",
                }}
                onChange={handleDateChange}
              />
            </div>
          </div>
        </div>
        {/* Botón de Registro */}
        <div className="flex w-full justify-center">
          <Button
            radius="full"
            type="submit"
            className="min-w-44 bg-[#634AE2] text-white"
          >
            Registrar
          </Button>
        </div>
      </Form>
    </div>
  );
};
