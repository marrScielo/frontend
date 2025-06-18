"use client";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/icons";
import { useDropzone } from "react-dropzone";
import CerrarSesion from "@/components/CerrarSesion";
import { AtencionFormData, Citas, Enfermedad } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "@/components/ToastStyle";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form } from "@heroui/react";

function DropzoneWithFiles({
  onFilesChange,
  existingFiles = [],
  isEditing = false,
}: {
  onFilesChange: (files: File[]) => void;
  existingFiles?: string[];
  isEditing?: boolean;
}) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noKeyboard: true,
    maxFiles: 1, // Solo permitir 1 archivo
    onDrop: (files) => {
      onFilesChange(files);
    },
  });

  // Si hay archivos nuevos, mostrar solo el nuevo (reemplaza al existente)
  const filesToShow = acceptedFiles.length > 0 ? acceptedFiles : [];

  // Mostrar archivo existente solo si no hay archivos nuevos
  const showExistingFile =
    acceptedFiles.length === 0 && existingFiles.length > 0;

  const newFiles = filesToShow.map((file) => (
    <li
      key={file.path}
      className="text-sm text-[#634AE2] py-1 flex items-center"
    >
      <svg
        className="w-4 h-4 mr-2 text-green-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {file.name}
      <span className="text-green-500 text-xs ml-1">
        {isEditing ? "(reemplazará archivo actual)" : "(nuevo)"}
      </span>
    </li>
  ));

  // Mostrar archivo existente
  const existingFileElements = showExistingFile
    ? existingFiles.map((fileName, index) => (
        <li
          key={`existing-${index}`}
          className="text-sm text-[#634AE2] py-1 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {fileName}{" "}
          <span className="text-blue-500 text-xs ml-1">(actual)</span>
        </li>
      ))
    : [];

  const hasFiles = newFiles.length > 0 || existingFileElements.length > 0;

  return (
    <section className="container border-1 border-[#634AE2] rounded-2xl w-11/12">
      <div
        {...getRootProps({
          className:
            "dropzone cursor-pointer hover:bg-gray-50 transition-colors",
        })}
      >
        <input {...getInputProps()} />
        {!hasFiles ? (
          <p className="text-[#634AE2] text-center text-8xl py-4">+</p>
        ) : (
          <div className="text-center py-4">
            <p className="text-[#634AE2] text-4xl mb-2">📁</p>
            <p className="text-[#634AE2] text-sm">
              {isEditing
                ? acceptedFiles.length > 0
                  ? "Haz clic para cambiar el archivo a reemplazar"
                  : "Haz clic para reemplazar el archivo actual"
                : "Haz clic para seleccionar archivo"}
            </p>
          </div>
        )}
      </div>

      {hasFiles && (
        <aside className="px-4 pb-2">
          <h4 className="text-sm font-semibold text-[#634AE2] mb-2">
            {acceptedFiles.length > 0 ? "Archivo a subir:" : "Archivo actual:"}
          </h4>
          <ul>
            {existingFileElements}
            {newFiles}
          </ul>
          {isEditing && acceptedFiles.length > 0 && (
            <p className="text-xs text-orange-600 mt-2">
              ⚠️ El archivo actual será reemplazado al guardar
            </p>
          )}
        </aside>
      )}
    </section>
  );
}

export default function App() {
  const param = useParams();
  const idCita = param.slug as string;
  const [cita, setCita] = useState<Citas | null>({
    idCita: " ",
    idPaciente: " ",
    idPsicologo: " ",
    paciente: " ",
    codigo: " ",
    fecha_inicio: " ",
    estado: " ",
    duracion: " ",
    age: " ",
    canal: " ",
    motivo: "",
  });
  const [enfermedades, setEnfermedades] = useState<Enfermedad[]>([]);
  const [DSM5SearchTerm, setDSM5SearchTerm] = useState("");
  const [CEA10SearchTerm, setCEA10SearchTerm] = useState("");
  const [showDSM5Dropdown, setShowDSM5Dropdown] = useState(false);
  const [showCEA10Dropdown, setShowCEA10Dropdown] = useState(false);
  const [selectedEnfermedad, setSelectedEnfermedad] =
    useState<Enfermedad | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando
  const [atencionExistente, setAtencionExistente] = useState<any>(null); // Para almacenar la atención existente
  const [isDownloading, setIsDownloading] = useState(false); // Estado para el botón de descarga
  const router = useRouter();
  const nameDropdownRef = useRef<HTMLDivElement>(null);
  const DSM5DropdownRef = useRef<HTMLDivElement>(null);
  const CEA10DropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<AtencionFormData>({
    MotivoConsulta: "",
    FormaContacto: "",
    Diagnostico: "",
    Tratamiento: "",
    Observacion: "",
    idEnfermedad: "",
    UltimosObjetivos: "",
    FechaAtencion: new Date().toISOString().split("T")[0],
    DocumentosAdicionales: "",
    comentario: "",
  });

  const handleFilesChange = (files: File[]) => {
    setUploadedFiles(files);
  };

  // Función para descargar el documento
  const handleDownloadDocument = async () => {
    if (!atencionExistente || !atencionExistente.idAtencion) {
      showToast("error", "No hay atención disponible para descargar");
      return;
    }

    setIsDownloading(true);
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/${atencionExistente.idAtencion}/documento/download`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Obtener el nombre del archivo del header Content-Disposition si está disponible
        const contentDisposition = response.headers.get("Content-Disposition");
        let fileName = "documento_atencion.pdf"; // nombre por defecto

        if (contentDisposition) {
          const fileNameMatch =
            contentDisposition.match(/filename="?([^"]+)"?/);
          if (fileNameMatch) {
            fileName = fileNameMatch[1];
          }
        }

        // Crear blob y descargar
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);

        showToast("success", "Documento descargado correctamente");
      } else {
        const errorData = await response.json();
        showToast(
          "error",
          errorData.message || "Error al descargar el documento"
        );
      }
    } catch (error) {
      console.error("Error al descargar documento:", error);
      showToast("error", "Error de conexión al descargar el documento");
    } finally {
      setIsDownloading(false);
    }
  };

  useEffect(() => {
    if (cita) {
      setFormData((prev) => ({
        ...prev,
        MotivoConsulta: cita.motivo || "",
        FormaContacto: cita.canal || "",
      }));
    }
  }, [cita]);

  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const HandleTest = () => {
    console.log("hola", formData);
  };
  const handleGetAtencion = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/ultima/cita/${idCita}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Datos de atención:", data);

        if (data.result) {
          setAtencionExistente(data.result);
          setIsEditing(true);

          setFormData((prev) => ({
            ...prev,
            Diagnostico: data.result.diagnostico || "",
            Tratamiento: data.result.tratamiento || "",
            Observacion: data.result.observacion || "",
            UltimosObjetivos: data.result.ultimosObjetivos || "",
            idEnfermedad: data.result.idEnfermedad?.toString() || "",
            comentario: data.result.comentario || "",
            DocumentosAdicionales: data.result.documentosAdicionales || "",
          }));

          if (data.result.documentosAdicionales) {
            const files = data.result.documentosAdicionales
              .split(",")
              .map((file: string) => file.trim())
              .filter((file: string) => file);
            setExistingFiles(files);
          }

          if (data.result.documentosAdicionales) {
            let filesArray: string[] = [];

            if (typeof data.result.documentosAdicionales === "string") {
              filesArray = data.result.documentosAdicionales
                .split(",")
                .map((file: string) => file.trim())
                .filter((file: string) => file !== "");
            } else if (Array.isArray(data.result.documentosAdicionales)) {
              filesArray = data.result.documentosAdicionales.filter(
                (file: string) => file !== ""
              );
            }

            setExistingFiles(filesArray);
          }

          if (data.result.idEnfermedad) {
            const enfermedadExistente = enfermedades.find(
              (e) =>
                e.idEnfermedad.toString() ===
                data.result.idEnfermedad.toString()
            );
            if (enfermedadExistente) {
              setSelectedEnfermedad(enfermedadExistente);
              setDSM5SearchTerm(enfermedadExistente.DSM5);
              setCEA10SearchTerm(enfermedadExistente.CEA10);
            }
          }
        }
      } else if (response.status === 404) {
        console.log("No existe atención para esta cita");
        setIsEditing(false);
        setAtencionExistente(null);
        setExistingFiles([]); // Limpiar archivos existentes
      }
    } catch (error) {
      console.error("Error al verificar atención:", error);
      setIsEditing(false);
      setAtencionExistente(null);
      setExistingFiles([]); // Limpiar archivos existentes
    }
  };

  const handleGetCita = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/citas/${idCita}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Datos del paciente:", data);
      if (response.ok) {
        setCita(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetEnfermedades = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/enfermedades`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEnfermedades(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetCita();
    handleGetEnfermedades();
  }, []);

  // Verificar atención después de cargar enfermedades
  useEffect(() => {
    if (enfermedades.length > 0) {
      handleGetAtencion();
    }
  }, [enfermedades]);

  const filteredEnfermedadesByDSM5 = DSM5SearchTerm
    ? enfermedades.filter((enfermedad) =>
        enfermedad.DSM5.toLowerCase().includes(DSM5SearchTerm.toLowerCase())
      )
    : enfermedades;

  const filteredEnfermedadesByCEA10 = CEA10SearchTerm
    ? enfermedades.filter((enfermedad) =>
        enfermedad.CEA10.toLowerCase().includes(CEA10SearchTerm.toLowerCase())
      )
    : enfermedades;

  const handleEnfermedadSelect = (enfermedad: Enfermedad) => {
    setSelectedEnfermedad(enfermedad);
    setDSM5SearchTerm(enfermedad.DSM5);
    setCEA10SearchTerm(enfermedad.CEA10);
    setShowDSM5Dropdown(false);
    setShowCEA10Dropdown(false);
    setFormData({
      ...formData,
      idEnfermedad: enfermedad.idEnfermedad.toString(),
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        DSM5DropdownRef.current &&
        !DSM5DropdownRef.current.contains(event.target as Node)
      ) {
        setShowDSM5Dropdown(false);
      }
      if (
        CEA10DropdownRef.current &&
        !CEA10DropdownRef.current.contains(event.target as Node)
      ) {
        setShowCEA10Dropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función unificada para POST y PUT
  // Método para crear una nueva atención (POST)
  const HandleCreateAtencion = async () => {
    if (!selectedEnfermedad) {
      console.log("Error: No hay enfermedad seleccionada");
      showToast("error", "Selecciona una enfermedad primero");
      return;
    }

    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/${idCita}`;

      const formDataToSend = new FormData();

      formDataToSend.append("idCita", idCita);
      formDataToSend.append("diagnostico", formData.Diagnostico);
      formDataToSend.append("tratamiento", formData.Tratamiento);
      formDataToSend.append("observacion", formData.Observacion);
      formDataToSend.append("ultimosObjetivos", formData.UltimosObjetivos);
      formDataToSend.append("idEnfermedad", formData.idEnfermedad);
      formDataToSend.append("fechaAtencion", formData.FechaAtencion);
      formDataToSend.append("comentario", formData.comentario);

      if (uploadedFiles.length > 0) {
        uploadedFiles.forEach((file, index) => {
          formDataToSend.append("documentosAdicionales", file);
        });
      }

      console.log("Enviando POST - Datos a enviar:");
      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      console.log("Respuesta recibida. Status:", response.status);
      const data = await response.json();
      console.log("Datos de respuesta:", data);

      if (response.ok) {
        console.log("Atención creada correctamente");
        showToast("success", "Atención creada correctamente");

        // Cambiar a modo edición después de crear
        setIsEditing(true);
        setAtencionExistente(data.result);

        router.push(`/user/citas`);
      } else {
        console.log(
          "Error en la respuesta:",
          data.message || "Sin mensaje de error"
        );
        showToast("error", data.message || "Error al crear la atención");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      showToast("error", "Error de conexión. Intenta nuevamente.");
    }
  };

  const HandleUpdateAtencion = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/${idCita}`;

      const datos = {
        diagnostico: formData.Diagnostico,
        tratamiento: formData.Tratamiento,
        observacion: formData.Observacion,
        ultimosObjetivos: formData.UltimosObjetivos,
        idEnfermedad: formData.idEnfermedad,
        fechaAtencion: formData.FechaAtencion,
        comentario: formData.comentario,

        // Si quieres enviar nombre del archivo actual o metadatos, podrías incluirlos aquí
        // archivoActual: existingFileName (opcional)
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", "Atención actualizada correctamente");
        router.push(`/user/citas`);
      } else {
        console.error("Error en la respuesta:", data.message || data);
        showToast("error", data.message || "Error al actualizar la atención");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      showToast("error", "Error de conexión. Intenta nuevamente.");
    }
  };

  const HandleSubmitAtencion = async () => {
    if (isEditing) {
      await HandleUpdateAtencion();
    } else {
      await HandleCreateAtencion();
    }
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
              <h1>
                {isEditing
                  ? "Editar Atención al paciente"
                  : "Atención al paciente"}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-4 text-[#634AE2] font-bold text-normal">
        <div className="flex-1 ml-5 mr-5 bg-[#fff] rounded-2xl p-4">
          <div className="flex pt-2">
            <div className="flex-1 items-center justify-items-center">
              <div>Codigo del Paciente *</div>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={cita?.idPaciente}
                  className="pl-12 pr-3 text-sm h-9 font-normal mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
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
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>Nombre del Paciente</div>
              <div className="relative" ref={nameDropdownRef}>
                <input
                  type="text"
                  readOnly
                  value={cita?.paciente}
                  className="pl-12 pr-3 text-sm h-9 font-normal mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
                <span
                  className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
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
              </div>
            </div>
          </div>
          <div className="text-center pt-1">Paciente</div>
          <div className="flex justify-center">
            <input
              type="text"
              readOnly
              className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
              value={cita?.paciente}
              placeholder="Ningún paciente seleccionado"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div>Motivo de la consulta</div>
              <div className="relative">
                <input
                  type="text"
                  name="MotivoConsulta"
                  value={formData.MotivoConsulta}
                  onChange={(e) =>
                    setFormData({ ...formData, MotivoConsulta: e.target.value })
                  }
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>Forma de contacto</div>
              <div className="relative">
                <input
                  type="text"
                  name="FormaContacto"
                  value={formData.FormaContacto}
                  onChange={(e) =>
                    setFormData({ ...formData, FormaContacto: e.target.value })
                  }
                  className="pl-12 pr-3 text-sm h-9 mt-1 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1">Diagnostico</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="Diagnostico"
              value={formData.Diagnostico}
              onChange={(e) =>
                setFormData({ ...formData, Diagnostico: e.target.value })
              }
              placeholder="Ingrese su diagnóstico"
            />
          </div>
          <div className="text-center pt-1 pb-1">Tratamiento</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="Tratamiento"
              value={formData.Tratamiento}
              onChange={(e) =>
                setFormData({ ...formData, Tratamiento: e.target.value })
              }
              placeholder="Ingrese tratamiento"
            />
          </div>
          <div className="text-center pt-1 pb-1">Observacion</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="Observacion"
              value={formData.Observacion}
              onChange={(e) =>
                setFormData({ ...formData, Observacion: e.target.value })
              }
              placeholder="Ingrese sus observaciones"
            />
          </div>
        </div>

        <div className="flex-1 mr-5 ml-5 bg-[#fff] rounded-2xl p-6">
          <div className="text-center pt-1 pb-1">
            Últimos objetivos / Objetivo alcanzado
          </div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="UltimosObjetivos"
              value={formData.UltimosObjetivos}
              onChange={(e) =>
                setFormData({ ...formData, UltimosObjetivos: e.target.value })
              }
              placeholder="Objetivos Alcanzados"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div>DSM5</div>
              <div className="relative" ref={DSM5DropdownRef}>
                <input
                  type="text"
                  value={DSM5SearchTerm}
                  onChange={(e) => {
                    setDSM5SearchTerm(e.target.value);
                    setShowDSM5Dropdown(true);
                  }}
                  onFocus={() => {
                    setShowDSM5Dropdown(true);
                    if (!selectedEnfermedad) {
                      setDSM5SearchTerm("");
                    }
                  }}
                  className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Buscar por DSM5"
                />
                {showDSM5Dropdown && (
                  <div className="absolute z-10 top-12 w-full bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredEnfermedadesByDSM5.length > 0 ? (
                      filteredEnfermedadesByDSM5.map((enfermedad) => (
                        <div
                          key={enfermedad.idEnfermedad}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handleEnfermedadSelect(enfermedad)}
                        >
                          {enfermedad.DSM5}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div>CEA 10</div>
              <div className="relative" ref={CEA10DropdownRef}>
                <input
                  type="text"
                  value={CEA10SearchTerm}
                  onChange={(e) => {
                    setCEA10SearchTerm(e.target.value);
                    setShowCEA10Dropdown(true);
                  }}
                  onFocus={() => {
                    setShowCEA10Dropdown(true);
                    if (!selectedEnfermedad) {
                      setCEA10SearchTerm("");
                    }
                  }}
                  className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                  placeholder="Buscar por CEA10"
                />
                {showCEA10Dropdown && (
                  <div className="absolute z-10 top-12 w-full bg-[#efefef] border rounded-lg shadow-lg max-h-60 overflow-auto">
                    {filteredEnfermedadesByCEA10.length > 0 ? (
                      filteredEnfermedadesByCEA10.map((enfermedad) => (
                        <div
                          key={enfermedad.idEnfermedad}
                          className="p-2 hover:bg-[#F3F3F3] cursor-pointer"
                          onClick={() => handleEnfermedadSelect(enfermedad)}
                        >
                          {enfermedad.CEA10}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        No se encontraron resultados
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1">Clasificación</div>
          <div className="flex justify-center">
            <input
              type="text"
              readOnly
              className="pl-12 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
              value={
                selectedEnfermedad
                  ? `${selectedEnfermedad.nombreEnfermedad}`
                  : ""
              }
              placeholder="Ninguna enfermedad seleccionada"
            />
          </div>
          <div className="text-center pt-1 pb-1">Documentos adicionales</div>
          <div className="flex justify-center">
            <DropzoneWithFiles
              onFilesChange={handleFilesChange}
              existingFiles={existingFiles}
              isEditing={isEditing}
            />
          </div>
          {/* Botón de descarga - solo se muestra si hay una atención existente */}
          {isEditing && atencionExistente && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleDownloadDocument}
                disabled={isDownloading}
                className="flex items-center gap-2 text-[#634AE2] bg-[#fff] border-2 border-[#634AE2] rounded-full px-4 py-2 hover:bg-[#634AE2] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    Descargando...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    Descargar Documento
                  </>
                )}
              </button>
            </div>
          )}

          <div className="text-center pt-1 pb-1">Comentario</div>
          <div className="flex justify-center">
            <textarea
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
              name="comentario"
              value={formData.comentario}
              onChange={(e) =>
                setFormData({ ...formData, comentario: e.target.value })
              }
              placeholder="Ingrese sus comentarios"
            />
          </div>

          <div className="text-center pt-1 pb-1">Fecha de Atención</div>
          <div className="flex justify-center">
            <input
              type="date"
              name="FechaAtencion"
              value={formData.FechaAtencion}
              onChange={(e) =>
                setFormData({ ...formData, FechaAtencion: e.target.value })
              }
              className="pl-3 pr-3 text-sm h-9 font-normal outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex justify-center gap-4 mt-6">
            <Link href="/user/citas">
              <button className="bg-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-400 transition-colors">
                Cancelar
              </button>
            </Link>
            <button
              onClick={HandleSubmitAtencion}
              className="bg-[#634AE2] text-white px-6 py-2 rounded-full hover:bg-[#5a42d4] transition-colors"
            >
              {isEditing ? "Actualizar Atención" : "Guardar Atención"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
