"use client";

import { Button, Input } from "@heroui/react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { Listarblog } from "./listarblog";
import Tiptap from "./textEdit";



// Define the type for a specialty
interface Especialidad {
  value: string;
  label: string;
}

const especialidades: Especialidad[] = [
  { value: "1", label: "Web Development" },
  { value: "2", label: "Mobile Development" },
  { value: "3", label: "Frontend Development" },
  { value: "4", label: "Backend Development" },
];

export default function BlogUsuarioCrear() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEspecialidad, setSelectedEspecialidad] =
    useState<Especialidad | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEspecialidades = especialidades.filter((esp) =>
    esp.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [tema, setTema] = useState("");

  const [url, setUrl] = useState("");
  const [view, setView] = useState("crear");
  return (
    <div>
      <div className="w-full h-16 bg-[#6364F4] items-center justify-start flex">
        <div className="ml-10 flex justify-between items-center w-full max-w-[230px]">
          <Button
            radius="full"
            className="bg-white text-[16px] leading-[20px] text-[#634AE2] font-bold"
            onClick={() => setView("crear")}
          >
            Crear Blog
          </Button>
          <Button  onClick={() => setView("blogs")} className="text-white text-[16px] leading-[20px] bg-[#634AE2] a" >
            Ver Blogs
          </Button>
        </div>
      </div>

      {view === "crear" ? (
      <div className="grid grid-cols-2 gap-10 mx-10 mt-14">
        <div className="flex flex-col items-center col-span-1 w-96 gap-y-3 mx-auto">
          <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
            Tema
          </h1>
          <Input
            placeholder="Ingresar Tema"
            className="w-full max-w-[400px]"
            radius="full"
            height={43}
            value={tema}
            onChange={(e) => setTema(e.target.value)}
          />

          <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
            Especialidad
          </h1>
          <div className="relative w-full max-w-[400px]">
            <Button
              radius="full"
              className="w-full h-[43px] bg-white border-2 border-gray-200 justify-between"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>
                {selectedEspecialidad
                  ? selectedEspecialidad.label
                  : "Seleccionar especialidad"}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200"
                        placeholder="Buscar especialidad..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto">
                    {filteredEspecialidades.map((especialidad) => (
                      <motion.div
                        key={especialidad.value}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        whileHover={{ backgroundColor: "#f3f4f6" }}
                        onClick={() => {
                          setSelectedEspecialidad(especialidad);
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                      >
                        {especialidad.label}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
            URL Imagen
          </h1>
          <Input
            placeholder="Url de imagen"
            className="w-full max-w-[400px] placeholder:text-[#634AE2]"
            radius="full"
            height={43}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <h1 className="h-10 bg-[#6364F4] w-full font-semibold text-white text-xl rounded-full flex items-center justify-start pl-3">
            Descripción
          </h1>
          <div className="py-4 w-full">
          <Tiptap tema={tema} especialidad={selectedEspecialidad} url={url} />
          </div>
        </div>
      </div>
   ):( <div className="mx-10 mt-14">
      
      <Listarblog />
    </div>)}
     </div>
  );
}