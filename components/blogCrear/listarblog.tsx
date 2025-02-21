import { Image, ScrollShadow } from "@heroui/react";
import { Delete, EditIcon, Pencil, Trash2 } from "lucide-react";

const columns = [
  {
    id: 1,
    tema: "Web Development",
    especialidad: "Frontend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    acciones: "Editar",
  },
  {
    id: 2,
    tema: "Mobile Development",
    especialidad: "Backend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    acciones: "Editar",
  },
  {
    id: 3,
    tema: "Frontend Development",
    especialidad: "Backend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026702d",
    acciones: "Editar",
  },
  {
    id: 4,
    tema: "Backend Development",
    especialidad: "Backend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
    acciones: "Editar",
  },{
    id: 5,
    tema: "Backend Development",
    especialidad: "Backend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
    acciones: "Editar",
  },{
    id: 6,
    tema: "Backend Development",
    especialidad: "Backend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
    acciones: "Editar",
  },{
    id: 7,
    tema: "Backend Development",
    especialidad: "Backend Development",
    imagen: "https://i.pravatar.cc/150?u=a042581f4e29026701d",
    acciones: "Editar",
  }
];

export function Listarblog() {
  return (
    <div className="max-h-[500px] overflow-y-auto overflow-scroll:scrollbar-none" >
    <table className="w-full border-separate border-spacing-y-4 ">
      <thead className="rounded-full">
        <tr className="bg-[#6364F4] text-white h-11 ">
          <th className="rounded-tl-full font-normal">ID</th>
          <th className="font-normal">Tema</th>
          <th className="font-normal">Especialidad</th>
          <th className="font-normal">Imagen</th>
          <th className="rounded-tr-full font-normal">Acciones</th>
        </tr>
      </thead>
     
      <tbody className="text-center   bg-white text-[#634AE2] font-normal text-[16px] leading-[20px]  ">
        {columns.map((column, index) => (
          <tr key={index} className="border-b hover:bg-gray-100  ">
            <td className="px-4 py-2 rounded-l-[34px]">{column.id}</td>
            <td className="px-4 py-2">{column.tema}</td>
            <td className="px-4 py-2">{column.especialidad}</td>
            <td className="px-4 py-2 flex justify-center items-center">
              <Image
                isZoomed
                width={120}
                height={70}
                radius="none"
                src={column.imagen}
                alt="Imagen de blog"
              />
            </td>
            <td className="px-4 py-2 rounded-r-[34px]">
              <div className="flex flex-row items-center justify-center gap-x-4">
                <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34px"
                  viewBox="0 -960 960 960"
                  width="34px"
                  fill="#634AE2"
                >
                  <path d="M120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm607.33-560.67L772.67-726l-46-46-45.34 45.33 46 46Z" />
                </svg>
                <h1 className="font-light text-sm">Editar</h1>
                </div>
                <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="34px"
                  viewBox="0 -960 960 960"
                  width="34px"
                  fill="#B158FF"
                  className="hover:"
                >
                  <path d="M282.98-140q-25.79 0-44.18-18.39t-18.39-44.18v-532.05H180v-50.25h174.05v-30.51h251.9v30.51H780v50.25h-40.41v532.05q0 25.79-18.39 44.18T677.02-140H282.98Zm96.56-133.23h50.25v-379.08h-50.25v379.08Zm150.67 0h50.25v-379.08h-50.25v379.08Z" />
                </svg>
                <h1 className="text-[#B158FF] font-light text-sm">Eliminar</h1>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
     
    </table>
    </div>
  );
}