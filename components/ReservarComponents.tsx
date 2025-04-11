"use client";
import { PsicologoPreviewData } from "@/interface";
import ReservarComponentSearch from "./ReservarComponentSearch";
import ReservarPsiPreview from "./ReservarPsiPreview";
import { useState } from "react";

export default function ReservarComponents({
  Psicologos,
}: {
  Psicologos: PsicologoPreviewData[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPsicologos = Psicologos.filter((psicologo) => {
    const fullName = `${psicologo.nombre} ${psicologo.apellido}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full md:max-w-7xl mx-auto " >
      <div className="  text-[#634AE2] mx-auto  py-5 md:py-10">
        <h1 className="pt-10 lg:text-3xl font-bold text-center md:text-start text-2xl">
          La mejor inversión es en
          <br className="block sm:hidden" /> ti mismo
          <br className="block sm:hidden" /> ¡Comienza tu proceso hoy!
        </h1>

        <h5 className="lg:mt-3 font-light lg:text-[24px] text-center md:text-start text-base mt-1">
          Agenda tu sesión con un psicólogo en
          <br className="block sm:hidden" /> línea, fácil, seguro y privado
        </h5>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 ">
        <div>
          <ReservarComponentSearch
            onSearchChange={(term) => setSearchTerm(term)}
          />
        </div>
        <div className="flex flex-wrap gap-8">
          {filteredPsicologos.map((Item, index) => (
            <div key={index} className="w-full sm:w-auto mx-auto">
              <ReservarPsiPreview psicologo={Item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

