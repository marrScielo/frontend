import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons/iconsvg";
import { FormData } from "@/interface";
import { Flags } from "@/utils/flagsPsicologos";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  DateValue,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import React, { useState } from "react";

export const PersonalForm = ({
  onNext,
  initialFormData,
}: {
  onNext: (data: FormData) => void;
  initialFormData: FormData;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);


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

  const validatePassword = (password: string) => {
    // Verifica si contiene al menos una letra mayúscula
    const hasUpperCase = /[A-Z]/.test(password);
    // Verifica si contiene al menos una letra minúscula
    const hasLowerCase = /[a-z]/.test(password);
    // Verifica si contiene al menos un número
    const hasNumber = /[0-9]/.test(password);
    // Verifica si contiene al menos un carácter especial
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );
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
      setPasswordError(
        "La contraseña debe contener al menos una letra mayúscula"
      );
      return false;
    } else if (!hasLowerCase) {
      setPasswordError(
        "La contraseña debe contener al menos una letra minúscula"
      );
      return false;
    } else if (!hasNumber) {
      setPasswordError("La contraseña debe contener al menos un número");
      return false;
    } else if (!hasSpecialChar) {
      setPasswordError(
        "La contraseña debe contener al menos un carácter especial"
      );
      return false;
    } else if (!hasNoSpaces) {
      setPasswordError("La contraseña no debe contener espacios");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormData((prev) => (prev ? { ...prev, email: newEmail } : prev));

    if (newEmail) {
      // Si hay texto, validamos formato
      const ok = validateEmail(newEmail);
      setIsEmailValid(ok);
    } else {
      // Si está vacío, lo consideramos válido y borramos mensaje
      setIsEmailValid(true);
      setEmailError("");
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleDateChange = (date: DateValue | null) => {
    if (!date) return;

    setFormData((prev) => ({
      ...prev,
      fecha_nacimiento: `${String(date.day).padStart(2, "0")}/${String(
        date.month
      ).padStart(2, "0")}/${String(date.year)}`,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setFormData({
      ...formData,
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
    <div className="text-[#634AE2] h-auto p-10 items-center bg-white rounded-3xl ">
      <h1 className="font-semibold text-center mb-5 ">
        Ingrese los datos del Psicólogo
      </h1>
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 w-auto lg:w-[700px]   gap-10">
          <div className="flex flex-col space-y-10">
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
              value={formData.name}
              variant="faded"
              onChange={(e) => {
                const sanitized = e.target.value.replace(
                    /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü ]/g,
                    ""
                  );
                setFormData({
                    ...formData,
                    name: sanitized,
                  });
              }}
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
              variant="flat"
              maxValue={today(getLocalTimeZone()).subtract({ years: 20 })}
              minValue={today(getLocalTimeZone()).subtract({ years: 100 })}
              showMonthAndYearPickers
              radius="full"
              classNames={{
                segment: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2] h-[42px]",
                base: "!mt-0.5",
              }}
              onChange={handleDateChange}
            />

            <Select
              label="Género"
              labelPlacement="outside"
              isRequired
              radius="full"
              variant="faded"
              selectedKeys={[formData.genero]}
              classNames={{
                label: "!text-[#634AE2]",
                trigger: "border-2 border-[#634AE2]",
                value: "!text-[#634AE2]",
              }}
              placeholder="Seleccione su género"
              onChange={(e) =>
                setFormData({ ...formData, genero: e.target.value })
              }
            >
              <SelectItem
                className="text-[#634AE2]"
                key="femenino"
                textValue="femenino"
              >
                Femenino
              </SelectItem>
              <SelectItem
                className="text-[#634AE2]"
                key="masculino"
                textValue="masculino"
              >
                Masculino
              </SelectItem>
              <SelectItem
                className="text-[#634AE2]"
                key="otros"
                textValue="otros"
              >
                Otros
              </SelectItem>
            </Select>
            <Input
              label="E-mail"
              labelPlacement="outside"
              isRequired
              radius="full"
              min={5}
              max={254}
              value={formData.email}
              isInvalid={!isEmailValid}
              errorMessage={emailError}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: `border-2 ${
                  isEmailValid ? "border-[#634AE2]" : "border-danger"
                } h-10`,
                input: "placeholder:!text-[#634AE2] text-sm",
                errorMessage: "text-danger text-xs mt-1",
              }}
              placeholder="ejemplo@mail.com"
              type="email"
              variant="faded"
              onChange={handleEmailChange}
              onBlur={() => {
                if (formData?.email)
                  setIsEmailValid(validateEmail(formData.email));
              }}
            />
          </div>
          <div className="flex flex-col space-y-10">
            <Input
              label="Apellido"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              minLength={2}
              maxLength={50}
              value={formData.apellido}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              isRequired
              placeholder="Ingrese su apellido"
              type="text"
              onChange={(e) => {
                  const sanitized = e.target.value.replace(
                    /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü ]/g,
                    ""
                  );
                  setFormData({
                    ...formData,
                    apellido: sanitized,
                  });
                }}
            />

            <div className="flex items-center gap-2 !mt-4 !pt-0">
              <span className="text-[#634AE2] text-sm">Pais</span>
              <span className="text-danger">*</span>
            </div>
            <Autocomplete
              aria-label="País"
              defaultSelectedKey={formData.pais}
              onSelectionChange={(key) =>
                setFormData({ ...formData, pais: key as string })
              }
              classNames={{
                popoverContent: "border-2 border-[#634AE2]",
                base: "!mt-0.5",
                listbox: "placeholder:!text-[#634AE2]",
              }}
              placeholder="Ingrese su país"
              isRequired
              radius="full"
              variant="faded"
            >
              {Flags.map((item) => (
                <AutocompleteItem key={item.value} textValue={item.value}>
                  {item.label}
                </AutocompleteItem>
              ))}
            </Autocomplete>

            <Input
              name="password"
              isRequired
              radius="full"
              label="Contraseña"
              minLength={8}
              max={20}
              labelPlacement="outside"
              value={formData.password}
              isInvalid={!isPasswordValid}
              errorMessage={passwordError}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: `border-2 ${
                  isPasswordValid ? "border-[#634AE2]" : "border-danger"
                } min-h-[44px] h-auto`,
                input: "placeholder:!text-gray-600 !text-gray-900 text-sm min-h-[44px]",
                errorMessage: "text-danger text-xs mt-1",
              }}
              placeholder="Ingrese su contraseña"
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none min-w-[44px] min-h-[44px] flex items-center justify-center"
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
                if (formData.password) {
                  setIsPasswordValid(validatePassword(formData.password));
                }
              }}
            />
            <Input
              name="titulo"
              isRequired
              radius="full"
              label="Título"
              minLength={5}
              maxLength={50}
              labelPlacement="outside"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              placeholder="ingrese su título"
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]",
                input: "placeholder:!text-[#634AE2]",
              }}
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
    </div>
  );
};
