"use client";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons/iconsvg";
import { FormDataAdmin } from "@/interface";
import { Button, DatePicker, DateValue, Form, Input } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import React from "react";
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
  const [emailError, setEmailError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Función para validar el formato del email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    
    if (!email) {
      setEmailError("El correo es requerido");
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Ingrese un correo válido (ejemplo@dominio.com)");
      return false;
    }
    
    setEmailError("");
    return true;
  };

  // Función para validar la contraseña
  const validatePassword = (password: string) => {
    // Verifica si contiene al menos una letra mayúscula
    const hasUpperCase = /[A-Z]/.test(password);
    // Verifica si contiene al menos una letra minúscula
    const hasLowerCase = /[a-z]/.test(password);
    // Verifica si contiene al menos un número
    const hasNumber = /[0-9]/.test(password);
    // Verifica si contiene al menos un carácter especial
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    // Verifica que no tenga espacios
    const hasNoSpaces = !/\s/.test(password);
    // Verifica la longitud mínima
    const hasMinLength = password.length >= 8;

    if (!password) {
      setPasswordError("La contraseña es requerida");
      return false;
    } else if (!hasMinLength) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      return false;
    } else if (!hasUpperCase) {
      setPasswordError("La contraseña debe contener al menos una letra mayúscula");
      return false;
    } else if (!hasLowerCase) {
      setPasswordError("La contraseña debe contener al menos una letra minúscula");
      return false;
    } else if (!hasNumber) {
      setPasswordError("La contraseña debe contener al menos un número");
      return false;
    } else if (!hasSpecialChar) {
      setPasswordError("La contraseña debe contener al menos un carácter especial");
      return false;
    } else if (!hasNoSpaces) {
      setPasswordError("La contraseña no debe contener espacios");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();


  if (!formDataAdmin.imagen) {
    showToast("error", "Por favor selecciona una imagen de perfil");
    return;
  }
  
  const isEmailOk = validateEmail(formDataAdmin.email);
  const isPasswordOk = validatePassword(formDataAdmin.password);
  
  if (!isEmailOk || !isPasswordOk) {
    return;
  }

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
  if (!file) {
    showToast("error", "Por favor selecciona una imagen");
    return;
  }

  
  const maxSizeInBytes = 1.2 * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    showToast("error", "La imagen debe ser menor a 1.2 MB");
    return;
  }

  try {
    const webpImage = await convertImageToWebP(file);
    const base64 = await convertToBase64(webpImage);
    setBase64Image(base64);
    setFormDataAdmin((prev) => ({ ...prev, imagen: base64 }));
    showToast("success", "Imagen cargada correctamente");
  } catch (error) {
    console.error("Error al procesar la imagen:", error);
    showToast("error", "Error al procesar la imagen");
  }
};

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormDataAdmin({
      ...formDataAdmin,
      email: newEmail,
    });
   
    if (newEmail) {
      setIsEmailValid(validateEmail(newEmail));
    } else {
      setIsEmailValid(true); 
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormDataAdmin({
      ...formDataAdmin,
      password: newPassword,
    });
    
    if (newPassword) {
      setIsPasswordValid(validatePassword(newPassword));
    } else {
      setIsPasswordValid(true); 
      setPasswordError("");
    }
  };

  return (
    <div className="text-[#634AE2] h-auto p-10 items-center bg-white rounded-3xl">
      <h1 className="font-semibold text-center mb-5 text-4xl">
        Registro de Administrador
      </h1>

      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-10 w-full">
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

          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="Nombre"
                labelPlacement="outside"
                radius="full"
                maxLength={50}
                minLength={2}
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
                onChange={(e) => {
                  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]*$/;
                  if (regex.test(e.target.value)) {
                    setFormDataAdmin({
                      ...formDataAdmin,
                      name: e.target.value,
                    });
                  }
                }}
              />
              <Input
                label="Apellido"
                labelPlacement="outside"
                radius="full"
                variant="faded"
                maxLength={50}
                minLength={2}
                value={formDataAdmin.apellido}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                isRequired
                placeholder="Ingrese su apellido"
                type="text"
                onChange={(e) =>{
                  const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'`´\-]*$/;
                  if (regex.test(e.target.value)) {
                    setFormDataAdmin({
                      ...formDataAdmin,
                      apellido: e.target.value,
                    });
                  }
                }
              }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input
                label="E-mail"
                labelPlacement="outside"
                isRequired
                radius="full"
                min={5}
                max={254}
                value={formDataAdmin.email}
                isInvalid={!isEmailValid}
                errorMessage={emailError}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: `border-2 ${isEmailValid ? "border-[#634AE2]" : "border-danger"} h-10`,
                  input: "placeholder:!text-[#634AE2] text-sm",
                  errorMessage: "text-danger text-xs mt-1",
                }}
                placeholder="ejemplo@mail.com"
                type="email"
                variant="faded"
                onChange={handleEmailChange}
                onBlur={() => {
                  // Validar cuando el usuario sale del campo
                  if (formDataAdmin.email) {
                    setIsEmailValid(validateEmail(formDataAdmin.email));
                  }
                }}
              />

              <Input
                name="password"
                isRequired
                radius="full"
                label="Contraseña"
                minLength={8}
                max={20}
                labelPlacement="outside"
                value={formDataAdmin.password}
                isInvalid={!isPasswordValid}
                errorMessage={passwordError}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: `border-2 ${isPasswordValid ? "border-[#634AE2]" : "border-danger"} h-10`,
                  input: "placeholder:!text-[#634AE2] text-sm",
                  errorMessage: "text-danger text-xs mt-1",
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
                onChange={handlePasswordChange}
                onBlur={() => {
                  
                  if (formDataAdmin.password) {
                    setIsPasswordValid(validatePassword(formDataAdmin.password));
                  }
                }}
              />
            </div>

            <div className="mb-6">
              <label className="text-[#634AE2] text-sm font-medium block mb-1">
                Fecha de nacimiento
              </label>
              <DatePicker
                aria-label="Fecha de nacimiento"
                labelPlacement="outside"
                isRequired
                variant="faded"
                maxValue={today(getLocalTimeZone()).subtract({ years:20 })}
                minValue={today(getLocalTimeZone()).subtract({ years: 100 })}
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