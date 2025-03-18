import { Plus, SlidersHorizontalIcon } from "lucide-react";
import CerrarSesion from "../CerrarSesion";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const columns = [
  {
    id: 1,
    Paciente: "Jose",
    Codigo: "PA001",
    Dni: "12345678",
    Correo: "jose@gmail.com",
    Celular: "+56 987654321",
  },
  {
    id: 2,
    Paciente: "Jose",
    Codigo: "PA001",
    Dni: "12345678",
    Correo: "jose@gmail.com",
    Celular: "+56 987654321",
  },
  {
    id: 3,
    Paciente: "Jose",
    Codigo: "PA001",
    Dni: "12345678",
    Correo: "jose@gmail.com",
    Celular: "+56 987654321",
  },
];
export default function ListarPacientes() {
  return (
    <>
      <div className="flex justify-between w-full mt-10 mb-6">
        <h1 className=" flex items-center font-bold text-[32px]  leading-[40px]  ml-11   text-[#634AE2]  ">
          Pacientes
        </h1>
        <CerrarSesion />
      </div>
      <div className="w-full h-16 bg-[#6364F4] items-center justify-between flex gap-x-10">
        <div className="flex flex-row items-center gap-x-10">
          <div className="flex flex-row items-center gap-x-1">
            <SlidersHorizontalIcon className="text-white ml-10" />
            <h1 className="text-white text-lg font-extralight ml-2">Filtrar</h1>
          </div>

          <div className="flex flex-row items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#FFFFFF"
            >
              <path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            <Input
              placeholder="Buscar Pacientes"
              className="w-full max-w-[400px] "
              radius="full"
              height={43}
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-1 mr-5">
          <button className="hover:bg-gray-200 border-white border-1 text-[#634AE2] bg-white p-[2px] rounded-full">
            <Plus />
          </button>
          <Button
            radius="full"
            className="border-white text-white border-1 bg-[#fff0]  h-8 mx-auto"
          >
            Agregar nuevo paciente
          </Button>
        </div>
      </div>

      <table className="max-w-screen-2xl mx-auto w-full pt-9 border-separate border-spacing-y-4 px-8">
        <thead className="rounded-full">
          <tr className="bg-[#6364F4] text-white h-11 ">
            <th className="rounded-tl-full text-2xl font-normal">○</th>
            <th className=" font-normal">Paciente</th>
            <th className="font-normal">Código</th>
            <th className="font-normal">DNI</th>
            <th className="font-normal">Correo</th>
            <th className="font-normal">Celular</th>
            <th className="rounded-tr-full font-normal">Más</th>
          </tr>
        </thead>
        <tbody className="text-center   bg-white text-[#634AE2] font-normal text-[16px] leading-[20px]  ">
          {columns.map((column, index) => (
            <tr key={index} className="border-b hover:bg-gray-100  ">
              <td className="px-4 py-2 text-2xl rounded-l-[34px]">○</td>
              <td className="px-4 py-2">{column.Paciente}</td>
              <td className="px-4 py-2">{column.Codigo}</td>
              <td className="px-4 py-2">{column.Dni}</td>
              <td className="px-4 py-2">{column.Correo}</td>
              <td className="py-2">{column.Celular}</td>
              <td className="py-2 rounded-r-[34px]">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="flex flex-row items-center justify-center gap-x-4">
                    <Link
                      href="/user/pacientes/RegistroFamiliar"
                      className={cn("flex flex-col items-center")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="34px"
                        height="34px"
                        viewBox="0 0 28 25"
                        fill="none"
                      >
                        <path
                          d="M9.60884 19.2184C9.60884 19.2184 8.23615 19.2184 8.23615 17.8457C8.23615 16.473 9.60884 12.3549 15.0996 12.3549C20.5904 12.3549 21.9631 16.473 21.9631 17.8457C21.9631 19.2184 20.5904 19.2184 20.5904 19.2184H9.60884ZM15.0996 10.9822C16.1918 10.9822 17.2392 10.5484 18.0115 9.77609C18.7838 9.0038 19.2177 7.95635 19.2177 6.86417C19.2177 5.77199 18.7838 4.72454 18.0115 3.95225C17.2392 3.17996 16.1918 2.74609 15.0996 2.74609C14.0074 2.74609 12.96 3.17996 12.1877 3.95225C11.4154 4.72454 10.9815 5.77199 10.9815 6.86417C10.9815 7.95635 11.4154 9.0038 12.1877 9.77609C12.96 10.5484 14.0074 10.9822 15.0996 10.9822ZM7.15996 19.2184C6.95656 18.7898 6.85508 18.32 6.86346 17.8457C6.86346 15.9857 7.79689 14.0708 9.52099 12.7393C8.66056 12.4736 7.76391 12.3439 6.86346 12.3549C1.37269 12.3549 0 16.473 0 17.8457C0 19.2184 1.37269 19.2184 1.37269 19.2184H7.15996ZM6.17711 10.9822C7.08727 10.9822 7.96014 10.6207 8.60371 9.97712C9.24729 9.33354 9.60884 8.46067 9.60884 7.55052C9.60884 6.64036 9.24729 5.76749 8.60371 5.12392C7.96014 4.48034 7.08727 4.11879 6.17711 4.11879C5.26696 4.11879 4.39409 4.48034 3.75051 5.12392C3.10694 5.76749 2.74538 6.64036 2.74538 7.55052C2.74538 8.46067 3.10694 9.33354 3.75051 9.97712C4.39409 10.6207 5.26696 10.9822 6.17711 10.9822Z"
                          fill="#58A6FF"
                        />
                        <path
                          d="M16.1973 19.2986V20.2986H17.1973H19.6586V22.6897V23.6897H20.6586H22.5035H23.5035V22.6897V20.2986H26.0001H27.0001V19.2986V17.7172V16.7172H26.0001H23.5035V14.2031V13.2031H22.5035H20.6586H19.6586V14.2031V16.7172H17.1973H16.1973V17.7172V19.2986Z"
                          fill="white"
                          stroke="#58A6FF"
                        />
                      </svg>
                      <h1 className="text-[#58A6FF] font-light text-sm text-center">
                        Registro Familiar
                      </h1>
                    </Link>
                    <Link
                      href="/user/pacientes/DetallePaciente/"
                      className={cn("flex flex-col items-center")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="34px"
                        viewBox="0 -960 960 960"
                        width="34px"
                        fill="#634AE2"
                      >
                        <path d="M120-120v-142l559.33-558.33q9.34-9 21.5-14 12.17-5 25.5-5 12.67 0 25 5 12.34 5 22 14.33L821-772q10 9.67 14.5 22t4.5 24.67q0 12.66-4.83 25.16-4.84 12.5-14.17 21.84L262-120H120Zm607.33-560.67L772.67-726l-46-46-45.34 45.33 46 46Z" />
                      </svg>
                      <h1 className="font-light text-sm text-cente">Editar</h1>
                    </Link>
                    <div className="flex flex-col items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="34px"
                        viewBox="0 -960 960 960"
                        width="34px"
                        fill="#B158FF"
                      >
                        <path d="M282.98-140q-25.79 0-44.18-18.39t-18.39-44.18v-532.05H180v-50.25h174.05v-30.51h251.9v30.51H780v50.25h-40.41v532.05q0 25.79-18.39 44.18T677.02-140H282.98Zm96.56-133.23h50.25v-379.08h-50.25v379.08Zm150.67 0h50.25v-379.08h-50.25v379.08Z" />
                      </svg>
                      <h1 className="text-[#B158FF] font-light text-sm text-center">
                        Eliminar
                      </h1>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
