import { FormData } from "@/interface";
import { Button, Checkbox, CheckboxGroup, Form, Input, Textarea } from "@heroui/react";
import { Plus } from "lucide-react";
import { parseCookies } from "nookies";
import { useState } from "react";
import { toast, Zoom } from "react-toastify";

export const DataView = ({
  formData,
  onBack,
  setFormData,
  setIsSend,
}: {
  formData: FormData;
  onBack: () => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setIsSend: React.Dispatch<React.SetStateAction<boolean>>;
}) => {

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const cookies = parseCookies();
      const token = cookies["session"];

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...formData, especialidades: especialidad }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsSend(true);
        console.log("Éxito:", data.description);
      } else {
        if (data.errors && data.errors.email && data.errors.email.includes("The email has already been taken.")) {
          toast.warning("El email ya está siendo utilizado por otra cuenta. Por favor, utiliza un email diferente.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
            theme: "colored",
            transition: Zoom,
          });
        } else {
          toast.warn(data.message || "Ha ocurrido un error al procesar tu solicitud.", {
            position: "bottom-right",
            autoClose: 1300,
          });
        }

        console.error("Error en la solicitud:", data.message || "Error desconocido");
        console.error("Detalles:", data.errors || "No hay detalles");
      }
    } catch (error) {
      toast.error("Error de conexión. Por favor, intenta de nuevo más tarde.", {
        position: "top-center",
        autoClose: 1300,
      });
      console.error("Error al enviar al backend:", error);
    }
  };

  const especialidadesMap: Record<string, number> = {
    "cognitivo-conductual": 1,
    neuropsicologia: 2,
    psicoanalisis: 3,
    psicopedagogia: 4,
    gestalt: 5,
    "racional-emotivo": 6,
  };

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
    setFormData({ ...formData, imagen: base64 });
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
        );
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

  const [especialidad, setEspecialidad] = useState<number[]>([]);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleEspecialidadesChange = (values: string[]) => {
    // Convertir los valores seleccionados a números usando el mapeo
    const especialidadesNumeros = values.map(
      (value) => especialidadesMap[value]
    );
    setEspecialidad(especialidadesNumeros);
    setFormData({ ...formData, especialidades: especialidadesNumeros });
    setIsInvalid(especialidadesNumeros.length < 1);
  };

  return (
    <div className="text-[#634AE2] h-auto p-10 items-center bg-white rounded-3xl ">
      <div className="relative flex flex-col items-center mb-10">
        <h1 className="font-semibold text-4xl">¡Hola {formData.name}!</h1>
        <small>Ya casi acabamos</small>
      </div>
      <Form validationBehavior="native" onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 grid-rows-5 gap-10">
          <div className="col-span-2 row-span-2">
            <h3 className="font-bold text-base">Foto</h3>
            {/* <ImageUploader /> */}

            <div className="relative border-2 border-[#634AE2] rounded-lg h-36 w-full flex justify-center items-center cursor-pointer overflow-hidden">
              {base64Image ? (
                <img
                  src={formData.imagen}
                  alt="Imagen seleccionada"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Plus width={40} height={40} strokeWidth={2} color="#634AE2" />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleImageUpload(e);
                }}
                className="absolute inset-0 w-42 h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
          <div className="col-start-3  col-span-4 row-span-2  ">
            <Textarea
              isRequired
              value={formData.introduccion ?? "error"}
              classNames={{
                label: "!text-[#634AE2] font-bold text-base",
                inputWrapper:
                  "border-2 border-[#634AE2] bg-white w-full h-full",
                innerWrapper: "min-w-80 min-h-[120px]", // Asegura que el área de texto ocupe todo el espacio disponible
              }}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  introduccion: e.target.value,
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
              value={formData.experiencia.toString()}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experiencia: parseInt(e.target.value),
                })
              }
              classNames={{
                label: "!text-[#634AE2] font-bold text-base",
                inputWrapper: "border-2 border-[#634AE2] bg-white",
              }}
              type="number"
            />
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
              onValueChange={handleEspecialidadesChange}
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
    </div>
  );
};
