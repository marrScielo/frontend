import { Divider } from "@heroui/react";
import { Checkbox } from "@/components/ui/checkbox";

import { Icons } from "@/icons";

const pais = [
  { nombre: "México" },
  { nombre: "Colombia" },
  { nombre: "Argentina" },
  { nombre: "Perú" },
  { nombre: "Chile" },
];
const genero = [{ nombre: "Femenino" }, { nombre: "Masculino" }];
const idioma = [{ nombre: "Español" }, { nombre: "Ingles" }];
const Enfoque = [
  { nombre: "Niños" },
  { nombre: "Adolecentes" },
  { nombre: "Familiar" },
  { nombre: "Pareja" },
  { nombre: "Adulto" },
];

export default function ReservarComponentSearch() {
  return (
    <div className="w-[250px] p-4 border-r-1 pb-20 border-[#9494F3]">
      <Divider orientation="vertical" />
      <div className="relative">
        <input
          type="text"
      
         
          placeholder="Nombre"
          className="pl-12 pr-3 text-sm h-9  outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#EAEAFF]"
        />
        <span
          className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
          dangerouslySetInnerHTML={{
            __html: Icons.loup.replace(/<svg /, '<svg fill="currentColor" '),
          }}
          style={{
            width: "1.2em",
            height: "1.2em",
          }}
        />
      </div>
      <div className="pt-5"></div>
      <div className="border-t-1 border-[#9494F3]">
        <p className="pt-4 text-xl font-normal text-[#634AE2]">
          País de tu psicólogo
        </p>
        {pais.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 pt-2 ml-5">
            <Checkbox
              id={`pais-${index}`}
              className="text-xl rounded-2xl bg-white"
            />
            <div className="grid ">
              <label
                htmlFor={`pais-${index}`}
                className="text-sm font-light text-[#634AE2]"
              >
                {item.nombre}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-1 border-[#9494F3] mt-4">
        <p className="pt-4 text-xl font-normal text-[#634AE2]">Género</p>
        {genero.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 pt-2 ml-5">
            <Checkbox
              id={`pais-${index}`}
              className="text-xl rounded-2xl bg-white"
            />
            <div className="grid ">
              <label
                htmlFor={`pais-${index}`}
                className="text-sm font-light text-[#634AE2]"
              >
                {item.nombre}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-1 border-[#9494F3] mt-4">
        <p className="pt-4 text-xl font-normal text-[#634AE2]">Idioma</p>
        {idioma.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 pt-2 ml-5">
            <Checkbox
              id={`pais-${index}`}
              className="text-xl rounded-2xl bg-white"
            />
            <div className="grid ">
              <label
                htmlFor={`pais-${index}`}
                className="text-sm font-light text-[#634AE2]"
              >
                {item.nombre}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-1 border-[#9494F3] mt-4">
        <p className="pt-4 text-xl font-normal text-[#634AE2]">Enfoque</p>
        {Enfoque.map((item, index) => (
          <div key={index} className="flex items-center space-x-3 pt-2 ml-5">
            <Checkbox
              id={`pais-${index}`}
              className="text-xl rounded-2xl bg-white"
            />
            <div className="grid ">
              <label
                htmlFor={`pais-${index}`}
                className="text-sm font-light text-[#634AE2]"
              >
                {item.nombre}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
