import { AtencionFormData, DatePacienteProps, DetallesAtencionProps, ListaCitas } from "@/interface";
import React from "react";
import { useDropzone } from "react-dropzone";

function DropzoneWithoutKeyboard() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noKeyboard: true,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="container border-1 border-[#634AE2] rounded-2xl">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-[#634AE2] text-center text-9xl">+</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export const DetallesPaciente: React.FC<DetallesAtencionProps> = ({ idAtencion }) => {
  return (
    <div className="max-w-[480px]">
      <div className="bg-[#fff] h-max text-[#634AE2] rounded-3xl">
        <div className="text-center text-[#634AE2] font-bold text-2xl pb-1">
          Detalles del historial del paciente
        </div>
        <hr className="border-[#9494F3] pb-1" />
        <div className="text-[#634AE2] text-xl text-center font-bold">
          <div className="pb-1">Diagnóstico</div>
          <textarea
            className="bg-[#F3F3F3] w-full h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
            placeholder="Aun no hay comentarios"
          />
          <div className="pb-1">Tratamiento</div>
          <textarea
            className="bg-[#F3F3F3] w-full h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
            placeholder="Aun no hay comentarios"
          />
          <div className="pb-1">Observación</div>
          <textarea
            className="bg-[#F3F3F3] w-full h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
            placeholder="Aun no hay comentarios"
          />
          <div className="pb-1">Objetivo alcanzados</div>
          <textarea
            className="bg-[#F3F3F3] w-full h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
            placeholder="Aun no hay comentarios"
          />
          <div className="pb-1">Documento adicionales</div>
        </div>

        {/* Aquí insertamos el Dropzone */}
        <DropzoneWithoutKeyboard />

        <div className="flex justify-center items-center pt-3">
          <button className="rounded-full border-2 border-[#634AE2] pl-4 pr-4 h-8">
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};
