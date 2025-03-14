"use client";
import React from "react";
import { ThemeToggle } from "@/components/Themetoggle";
import { Icons } from "@/icons";
import { useDropzone } from "react-dropzone";

function DropzoneWithoutKeyboard() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    noKeyboard: true,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <section className="container border-1 border-[#634AE2] rounded-2xl w-11/12">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p className="text-[#634AE2] text-center text-8xl">+</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default function App() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-end justify-end w-full">
              <div className="flex gap-x-5">
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <div>
            <div className="pl-12 text-4xl items-center justify-items-center font-bold text-[#634AE2]">
              <h1>Registro familiar</h1>
            </div>
          </div>
        </div>
        {/* body */}
      </div>
      <div className="flex mt-4 text-[#634AE2] font-bold text-normal">
        <div className="flex-1 ml-5 mr-5 bg-[#fff] rounded-2xl p-4">
          <div className="flex pt-6">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Codigo del Paciente*</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
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
              <div className="py-1 mt-2">Nombre del Paciente</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
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
          <div className="text-center pt-1 pb-1 py-1 mt-4">Paciente</div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Nombre de la madre
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Estado de la madre
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Nombre del padre
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Estado del padre
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
        </div>
        {/*Segunda Columna*/}
        <div className="flex-1 mr-5 ml-5 bg-[#fff] rounded-2xl p-6">
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Nombre del apoderado
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Estado del apoderado
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-11/12 rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
            />
          </div>
          <div className="flex pt-1">
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Cantidad de hijos</div>
              <div className="relative">
                <input
                  type="text"
                  className="pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] placeholder:text-base placeholder:font-normal bg-[#F3F3F3]"
                />
              </div>
            </div>
            <div className="flex-1 items-center justify-items-center">
              <div className="py-1 mt-2">Cantidad de hermanos</div>
              <div className="relative">
                <input
                  type="text"
                  className="placeholder:text-base placeholder:font-normal pl-12 pr-3 text-sm h-9 mt-2 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#F3F3F3]"
                />
              </div>
            </div>
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Integracion familiar
          </div>
          <div className="flex justify-center">
            <textarea
              placeholder="Integracion familiar"
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
            />
          </div>
          <div className="text-center pt-1 pb-1 py-1 mt-4">
            Historial familiar
          </div>
          <div className="flex justify-center">
            <textarea
              placeholder="Historial familiar"
              className="bg-[#F3F3F3] w-11/12 h-20 border-1 font-light text-[#634AE2] p-3 rounded-3xl placeholder:text-[#634AE2] text-base"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full p-4 ">
        <button className="text-[#634AE2] bg-[#fff] rounded-full border-2 border-[#634AE2] w-28 h-8 mr-12">
          Registrar
        </button>
      </div>
    </div>
  );
}
