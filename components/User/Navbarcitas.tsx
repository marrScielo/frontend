import React from "react";
import { Icons } from "@/icons";

const NavbarCitas = () => {
  return (
    <div>
      <div>
        <div className="flex w-full mt-8">
          <div className="bg-[#6364F4] w-full h-[8vh] flex flex-row justify-start items-center px-4">
          
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCitas;



/*
    <div className="flex flex-row gap-4 w-full items-center pl-12">
             
              <span
                className="text-[#634AE2] transition-colors"
                dangerouslySetInnerHTML={{
                  __html: Icons.filter.replace(/<svg /, '<svg fill="#fff" '),
                }}
                style={{
                  width: "1.2em",
                  height: "1.2em",
                }}
              />
              <div className="text-[#fff] font-light text-xl">Filtrar</div>

     
              <span
                className="text-[#fff] transition-colors pl-6"
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

   
              <input
                type="text"
                placeholder="Buscar paciente"
                className="rounded-full placeholder:text-[#9494F3] bg-[#EAEAFF] ml-4 pl-4 w-40"
              />

              <div className="ml-auto flex items-center gap-4 mr-12">
       
                <span
                  className="text-[#634AE2] transition-colors"
                  dangerouslySetInnerHTML={{
                    __html: Icons.plus.replace(/<svg /, '<svg fill="#634AE2"'),
                  }}
                  style={{
                    background: "#fff",
                    borderRadius: "9999px",
                    borderColor: "#634AE2"
                  }}
                />

             
                <div className="text-[#fff] font-light text-xl border-1 rounded-full px-4">
                  Agregar nueva cita
                </div>
              </div>
            </div>
          


*/