import { EyeFilledIcon, EyeSlashFilledIcon } from "@/icons/iconsvg";
import { FormData } from "@/interface";
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
import React from "react";

const Flags = [
  {
    label: "Antigua y Barbuda",
    value: "AG",
  },
  {
    label: "Argentina",
    value: "AR",
  },
  {
    label: "Bahamas",
    value: "BS",
  },
  {
    label: "Barbados",
    value: "BB",
  },
  {
    label: "Belice",
    value: "BZ",
  },
  {
    label: "Bolivia",
    value: "BO",
  },
  {
    label: "Brasil",
    value: "BR",
  },
  {
    label: "Canadá",
    value: "CA",
  },
  {
    label: "Chile",
    value: "CL",
  },
  {
    label: "Colombia",
    value: "CO",
  },
  {
    label: "Costa Rica",
    value: "CR",
  },
  {
    label: "Cuba",
    value: "CU",
  },
  {
    label: "Dominica",
    value: "DM",
  },
  {
    label: "Ecuador",
    value: "EC",
  },
  {
    label: "El Salvador",
    value: "SV",
  },
  {
    label: "España",
    value: "ES",
  },

  { label: "Estados Unidos", value: "US" },
  {
    label: "Granada",
    value: "GD",
  },
  {
    label: "Guatemala",
    value: "GT",
  },
  {
    label: "Guyana",
    value: "GY",
  },
  {
    label: "Haití",
    value: "HT",
  },
  {
    label: "Honduras",
    value: "HN",
  },
  {
    label: "Jamaica",
    value: "JM",
  },
  {
    label: "México",
    value: "MX",
  },
  {
    label: "Nicaragua",
    value: "NI",
  },
  {
    label: "Panamá",
    value: "PA",
  },
  {
    label: "Paraguay",
    value: "PY",
  },
  {
    label: "Perú",
    value: "PE",
  },
  {
    label: "República Dominicana",
    value: "DO",
  },
  {
    label: "San Cristóbal y Nieves",
    value: "KN",
  },
  {
    label: "San Vicente y las Granadinas",
    value: "VC",
  },
  {
    label: "Santa Lucía",
    value: "LC",
  },
  {
    label: "Surinam",
    value: "SR",
  },
  {
    label: "Trinidad y Tobago",
    value: "TT",
  },
  {
    label: "Uruguay",
    value: "UY",
  },
  {
    label: "Venezuela",
    value: "VE",
  },
];

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

  return (
    <div className="text-[#634AE2] h-auto p-10 items-center bg-white rounded-3xl ">
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
              value={formData.email}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]", // Solo controla el borde
                input: "placeholder:!text-[#634AE2]", // Aquí es donde controlas el color del placeholder
              }}
              placeholder="ingrese su email"
              type="email"
              variant="faded"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col space-y-10">
            <Input
              label="Apellido"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              value={formData.apellido}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]",
                input: "placeholder:!text-[#634AE2]",
              }}
              className="w-full   text-[#634AE2]"
              isRequired
              placeholder="ingrese su apellido"
              type="text"
              onChange={(e) =>
                setFormData({ ...formData, apellido: e.target.value })
              }
            />
            <Input
              label="Edad"
              labelPlacement="outside"
              value={formData.edad.toString()}
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]",
                input: "placeholder:!text-[#634AE2]",
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
                <AutocompleteItem key={item.value} value={item.value}>
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
              labelPlacement="outside"
              value={formData.password}
              placeholder="ingrese su contraseña"
              classNames={{
                label: "!text-[#634AE2]",
                inputWrapper: "border-2 border-[#634AE2]",
                input: "placeholder:!text-[#634AE2]",
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
    </div>
  );
};
