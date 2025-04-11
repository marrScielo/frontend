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
      <div className="flex flex-col sm:flex-row gap-4 pb-6">
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

/*
 <div className="flex justify-center text-[#634AE2]">
      <div className="w-full max-w-7xl">
        <h1 className="lg:text-start pt-10 lg:text-3xl font-bold text-center text-2xl">
          La mejor inversión es en
          <br className="block lg:hidden" /> ti mismo
          <br className="block lg:hidden" /> ¡Comienza tu proceso hoy!
        </h1>

        <h5 className="lg:text-start lg:mt-3 font-light lg:text-[24px]  text-center text-base mt-1">
          Agenda tu sesión con un psicólogo en
          <br className="block lg:hidden" /> línea, fácil, seguro y privado
        </h5>
    
      </div>
    </div>
    <div className="flex justify-center mt-8 px-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 w-full ">
            <div className="col-span-1 sm:row-span-5 sm:col-span-1 ">
              <ReservarComponentSearch 
                onSearchChange={(term) => setSearchTerm(term)} 
              />
            </div>
            <div className="sm:row-span-4 sm:col-span-4 ml-5 col-span-1 ">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                {filteredPsicologos.map((Item, index) => (
                  <div key={index} className="col-span-1 sm:col-span-2">
                    <ReservarPsiPreview psicologo={Item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>


*/
