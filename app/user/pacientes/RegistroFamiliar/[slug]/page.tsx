"use client";
import React, { useEffect, useState, use } from "react";
import { Icons } from "@/icons";
import CerrarSesion from "@/components/CerrarSesion";
import { GetPacienteById, token } from "@/app/apiRoutes";
import showToast from "@/components/ToastStyle";
import { ro } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Paciente, RegistroPaciente } from "@/interface";
import { Input } from "@heroui/react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

interface RegistroFamiliarForm {
  idPaciente: string;
  nombre_madre: string;
  estado_madre: string;
  nombre_padre: string;
  estado_padre: string;
  nombre_apoderado: string;
  estado_apoderado: string;
  cantidad_hijos: string;
  cantidad_hermanos: string;
  integracion_familiar: string;
  historial_familiar: string;
}

interface ValidationErrors {
  nombre_madre: string;
  estado_madre: string;
  nombre_padre: string;
  estado_padre: string;
  nombre_apoderado: string;
  estado_apoderado: string;
  cantidad_hijos: string;
  cantidad_hermanos: string;
  integracion_familiar: string;
  historial_familiar: string;
}

export default function RegistroFamiliarPage({
  params,
  searchParams,
}: PageProps) {
  // Desenvolve la Promise de params usando React.use()
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const router = useRouter();

  const [pacienteData, setPacienteData] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);

  // Estado para errores de validación
  const [errors, setErrors] = useState<ValidationErrors>({
    nombre_madre: "",
    estado_madre: "",
    nombre_padre: "",
    estado_padre: "",
    nombre_apoderado: "",
    estado_apoderado: "",
    cantidad_hijos: "",
    cantidad_hermanos: "",
    integracion_familiar: "",
    historial_familiar: "",
  });

  // Formulario inicial con valores por defecto
  const [formData, setFormData] = useState<RegistroFamiliarForm>({
    idPaciente: slug || "",
    nombre_madre: "",
    estado_madre: "",
    nombre_padre: "",
    estado_padre: "",
    nombre_apoderado: "",
    estado_apoderado: "",
    cantidad_hijos: "",
    cantidad_hermanos: "",
    integracion_familiar: "",
    historial_familiar: "",
  });


  const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'`´\-]*$/;
  

  const statusRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/;

  const validateTextField = (value: string, fieldName: string, minLength: number = 2, maxLength: number = 50) => {
    if (!value.trim()) {
      return `${fieldName} es requerido`;
    }
    if (value.trim().length < minLength) {
      return `${fieldName} debe tener al menos ${minLength} caracteres`;
    }
    if (value.trim().length > maxLength) {
      return `${fieldName} no debe exceder ${maxLength} caracteres`;
    }
    return "";
  };

  const validateNumberField = (value: string, fieldName: string, min: number = 0, max: number = 20) => {
    if (value && (parseInt(value) < min || parseInt(value) > max)) {
      return `${fieldName} debe estar entre ${min} y ${max}`;
    }
    return "";
  };

  const validateTextArea = (value: string, fieldName: string, minLength: number = 10, maxLength: number = 500) => {
    if (!value.trim()) {
      return `${fieldName} es requerido`;
    }
    if (value.trim().length < minLength) {
      return `${fieldName} debe tener al menos ${minLength} caracteres`;
    }
    if (value.trim().length > maxLength) {
      return `${fieldName} no debe exceder ${maxLength} caracteres`;
    }
    return "";
  };

  const checkIfHasData = (registro_familiar: RegistroPaciente | undefined) => {
    if (!registro_familiar) return false;
    
    return !!(
      registro_familiar.nombre_madre ||
      registro_familiar.estado_madre ||
      registro_familiar.nombre_padre ||
      registro_familiar.estado_padre ||
      registro_familiar.nombre_apoderado ||
      registro_familiar.estado_apoderado ||
      registro_familiar.cantidad_hijos ||
      registro_familiar.cantidad_hermanos ||
      registro_familiar.integracion_familiar ||
      registro_familiar.historial_familiar
    );
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      idPaciente: slug,
    }));

    if (slug) {
      GetPacienteById(slug)
        .then((data: Paciente) => {
          setPacienteData(data);
          console.log("Datos del paciente:", data);
          const hasData = checkIfHasData(data.registro_familiar);
          setHasExistingData(hasData);

          if (hasData && data.registro_familiar) {
            setFormData((prev) => ({
              ...prev,
              nombre_madre: data.registro_familiar!.nombre_madre || "",
              estado_madre: data.registro_familiar!.estado_madre || "",
              nombre_padre: data.registro_familiar!.nombre_padre || "",
              estado_padre: data.registro_familiar!.estado_padre || "",
              nombre_apoderado: data.registro_familiar!.nombre_apoderado || "",
              estado_apoderado: data.registro_familiar!.estado_apoderado || "",
              cantidad_hijos: data.registro_familiar!.cantidad_hijos?.toString() || "",
              cantidad_hermanos: data.registro_familiar!.cantidad_hermanos?.toString() || "",
              integracion_familiar: data.registro_familiar!.integracion_familiar || "",
              historial_familiar: data.registro_familiar!.historial_familiar || "",
            }));
          }
        })
        .catch((error) => {
          console.error("Error al obtener paciente:", error);
        });
    }
  }, [slug]);

  const handleNameChange = (value: string, fieldName: keyof RegistroFamiliarForm) => {
    if (nameRegex.test(value)) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
      
      const error = validateTextField(value, fieldName.replace('_', ' '), 2, 50);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  const handleStatusChange = (value: string, fieldName: keyof RegistroFamiliarForm) => {
    if (statusRegex.test(value)) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
      
      const error = validateTextField(value, fieldName.replace('_', ' '), 2, 15);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  const handleNumberChange = (value: string, fieldName: keyof RegistroFamiliarForm) => {
    if (/^\d*$/.test(value)) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: value
      }));
      
      const error = validateNumberField(value, fieldName.replace('_', ' '), 0, 20);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  const handleTextAreaChange = (value: string, fieldName: keyof RegistroFamiliarForm) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    const error = validateTextArea(value, fieldName.replace('_', ' '), 10, 500);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {
      nombre_madre: validateTextField(formData.nombre_madre, "Nombre de la madre", 2, 50),
      estado_madre: validateTextField(formData.estado_madre, "Estado de la madre", 2, 15),
      nombre_padre: validateTextField(formData.nombre_padre, "Nombre del padre", 2, 50),
      estado_padre: validateTextField(formData.estado_padre, "Estado del padre", 2, 15),
      nombre_apoderado: validateTextField(formData.nombre_apoderado, "Nombre del apoderado", 2, 50),
      estado_apoderado: validateTextField(formData.estado_apoderado, "Estado del apoderado", 2, 15),
      cantidad_hijos: validateNumberField(formData.cantidad_hijos, "Cantidad de hijos", 0, 20),
      cantidad_hermanos: validateNumberField(formData.cantidad_hermanos, "Cantidad de hermanos", 0, 20),
      integracion_familiar: validateTextArea(formData.integracion_familiar, "Integración familiar", 10, 500),
      historial_familiar: validateTextArea(formData.historial_familiar, "Historial familiar", 10, 500),
    };

    setErrors(newErrors);
    
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showToast("error", "Por favor corrija los errores en el formulario");
      return;
    }

    setLoading(true);
    try {
      const method = hasExistingData ? "PUT" : "POST";
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/registros/${slug}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const successMessage = hasExistingData 
        ? "Registro familiar actualizado correctamente"
        : "Registro familiar guardado correctamente";
      
      showToast("success", successMessage);
      router.push(`/user/pacientes`);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      const errorMessage = hasExistingData
        ? "Error al actualizar el registro familiar"
        : "Error al guardar el registro familiar";
      showToast("error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) {
      return hasExistingData ? "Actualizando..." : "Guardando...";
    }
    return hasExistingData ? "Actualizar" : "Guardar";
  };

  return (
    <div className="p-4">
      <div className="flex flex-1 bg-[#eaeded] w-full z-30">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-end justify-end w-full">
              <div className="flex gap-x-5">
                <CerrarSesion />
              </div>
            </div>
          </nav>
          <div>
            <div className="pl-12 text-4xl items-center justify-items-center font-bold text-[#634AE2]">
              <h1>Registro familiar</h1>
              <p className="text-lg font-normal">
                Paciente: {pacienteData?.nombre || ""}{" "}
                {pacienteData?.apellido || ""}
              </p>
              {hasExistingData && (
                <p className="text-sm font-normal text-orange-600">
                  * Editando registro existente
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-8 text-[#634AE2] font-bold text-normal">
        <div className="flex-1 ml-5 mr-5 bg-[#fff] rounded-2xl p-4">
          <div className="flex pt-6 gap-4">
            <div className="flex-1">
              <Input
                label="Código del Paciente"
                labelPlacement="outside"
                radius="full"
                variant="faded"
                value={formData.idPaciente}
                isReadOnly
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10 bg-[#F3F3F3]",
                  input: "text-sm",
                }}
                endContent={
                  <span
                    className="text-[#634AE2]"
                    dangerouslySetInnerHTML={{
                      __html: Icons.loup.replace(
                        /<svg /,
                        '<svg fill="currentColor" '
                      ),
                    }}
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                    }}
                  />
                }
              />
            </div>
            <div className="flex-1">
              <Input
                label="Nombre del Paciente"
                labelPlacement="outside"
                radius="full"
                variant="faded"
                value={`${pacienteData?.nombre || ""} ${pacienteData?.apellido || ""}`}
                isReadOnly
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10 bg-[#F3F3F3]",
                  input: "text-sm",
                }}
                endContent={
                  <span
                    className="text-[#634AE2]"
                    dangerouslySetInnerHTML={{
                      __html: Icons.loup.replace(
                        /<svg /,
                        '<svg fill="currentColor" '
                      ),
                    }}
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                    }}
                  />
                }
              />
            </div>
          </div>

          <div className="mt-8">
            <Input
              label="Nombre de la madre"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              maxLength={50}
              value={formData.nombre_madre}
              isRequired
              isInvalid={!!errors.nombre_madre}
              errorMessage={errors.nombre_madre}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              placeholder="Ingrese el nombre de la madre"
              onChange={(e) => handleNameChange(e.target.value, 'nombre_madre')}
            />
          </div>

          <div className="mt-8">
            <Input
              label="Estado de la madre"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              maxLength={15}
              value={formData.estado_madre}
              isRequired
              isInvalid={!!errors.estado_madre}
              errorMessage={errors.estado_madre}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              placeholder="Viva/Fallecida"
              onChange={(e) => handleStatusChange(e.target.value, 'estado_madre')}
            />
          </div>

          <div className="mt-8">
            <Input
              label="Nombre del padre"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              maxLength={50}
              value={formData.nombre_padre}
              isRequired
              isInvalid={!!errors.nombre_padre}
              errorMessage={errors.nombre_padre}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              placeholder="Ingrese el nombre del padre"
              onChange={(e) => handleNameChange(e.target.value, 'nombre_padre')}
            />
          </div>

          <div className="mt-8">
            <Input
              label="Estado del padre"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              maxLength={15}
              value={formData.estado_padre}
              isRequired
              isInvalid={!!errors.estado_padre}
              errorMessage={errors.estado_padre}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              placeholder="Vivo/Fallecido"
              onChange={(e) => handleStatusChange(e.target.value, 'estado_padre')}
            />
          </div>
        </div>

        {/*Segunda Columna*/}
        <div className="flex-1 mr-5 ml-5 bg-[#fff] rounded-2xl p-6">
          <div className="mt-8">
            <Input
              label="Nombre del apoderado"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              maxLength={50}
              value={formData.nombre_apoderado}
              isRequired
              isInvalid={!!errors.nombre_apoderado}
              errorMessage={errors.nombre_apoderado}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              placeholder="Ingrese el nombre del apoderado"
              onChange={(e) => handleNameChange(e.target.value, 'nombre_apoderado')}
            />
          </div>

          <div className="mt-8">
            <Input
              label="Estado del apoderado"
              labelPlacement="outside"
              radius="full"
              variant="faded"
              maxLength={15}
              value={formData.estado_apoderado}
              isRequired
              isInvalid={!!errors.estado_apoderado}
              errorMessage={errors.estado_apoderado}
              classNames={{
                label: "!text-[#634AE2] text-sm mb-1",
                inputWrapper: "border-2 border-[#634AE2] h-10",
                input: "placeholder:!text-[#634AE2] text-sm",
              }}
              placeholder="Vivo/Fallecido"
              onChange={(e) => handleStatusChange(e.target.value, 'estado_apoderado')}
            />
          </div>

          <div className="flex pt-4 gap-4">
            <div className="flex-1">
              <Input
                label="Cantidad de hijos"
                labelPlacement="outside"
                radius="full"
                variant="faded"
                type="number"
                min={0}
                max={20}
                value={formData.cantidad_hijos}
                isInvalid={!!errors.cantidad_hijos}
                errorMessage={errors.cantidad_hijos}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                placeholder="0"
                onChange={(e) => handleNumberChange(e.target.value, 'cantidad_hijos')}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Cantidad de hermanos"
                labelPlacement="outside"
                radius="full"
                variant="faded"
                type="number"
                min={0}
                max={20}
                value={formData.cantidad_hermanos}
                isInvalid={!!errors.cantidad_hermanos}
                errorMessage={errors.cantidad_hermanos}
                classNames={{
                  label: "!text-[#634AE2] text-sm mb-1",
                  inputWrapper: "border-2 border-[#634AE2] h-10",
                  input: "placeholder:!text-[#634AE2] text-sm",
                }}
                placeholder="0"
                onChange={(e) => handleNumberChange(e.target.value, 'cantidad_hermanos')}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-[#634AE2] text-sm mb-1 block">Integración familiar *</label>
            <textarea
              value={formData.integracion_familiar}
              onChange={(e) => handleTextAreaChange(e.target.value, 'integracion_familiar')}
              placeholder="Describa la integración familiar"
              maxLength={500}
              className={`bg-[#F3F3F3] w-full h-20 border-2 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base resize-none ${
                errors.integracion_familiar ? 'border-red-500' : 'border-[#634AE2]'
              }`}
            />
            {errors.integracion_familiar && (
              <p className="text-red-500 text-xs mt-1">{errors.integracion_familiar}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-[#634AE2] text-sm mb-1 block">Historial familiar *</label>
            <textarea
              value={formData.historial_familiar}
              onChange={(e) => handleTextAreaChange(e.target.value, 'historial_familiar')}
              placeholder="Describa el historial familiar"
              maxLength={500}
              className={`bg-[#F3F3F3] w-full h-20 border-2 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base resize-none ${
                errors.historial_familiar ? 'border-red-500' : 'border-[#634AE2]'
              }`}
            />
            {errors.historial_familiar && (
              <p className="text-red-500 text-xs mt-1">{errors.historial_familiar}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full p-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`text-[#634AE2] bg-[#fff] rounded-full border-2 border-[#634AE2] w-32 h-10 mr-12 transition-all duration-200 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#634AE2] hover:text-white"
          }`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}