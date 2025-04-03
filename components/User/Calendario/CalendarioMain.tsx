"use client";
import CerrarSesion from "@/components/CerrarSesion";
import { Button } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Week from "./SelectorDate";

export default function CalendarioMain() {
  const Fecha = today(getLocalTimeZone());

  const nombreMes = new Date(Fecha.year, Fecha.month - 1).toLocaleString(
    "es-ES",
    {
      month: "long",
    }
  );
  return (
    <>
      <div className="flex justify-between  w-full mt-10 mb-6">
        <div className="flex flex-row justify-evenly space-x-5  ">
          <h1 className=" flex items-center font-bold text-[32px]  leading-[40px]  ml-11   text-[#634AE2]  ">
            Calendario de citas
          </h1>
          <Button className="bg-[#634AE2] rounded-full px-4 p text-white font-light">
            Nueva cita
          </Button>
        </div>
        <CerrarSesion />
      </div>
      <div className="w-full h-16 bg-[#6364F4] items-center justify-start flex px-8">
        <div className="flex-row flex  ">
          <ChevronLeft color="white" />
          <ChevronRight color="white" />
        </div>
        <div className="flex gap-2 items-center w-full max-w-[230px]">
          <Button
            radius="full"
            className="text-[16px] leading-[20px] bg-transparent border-1  text-background font-light"
          >
            Hoy
          </Button>
          <Button
            radius="full"
            className="text-[#634AE2] text-[16px] leading-[20px] bg-white "
          >
            Mis Horarios
          </Button>
        </div>
        <div className="text-white font-semibold text-2xl mx-auto ">
          {nombreMes[0].toUpperCase() + nombreMes.slice(1)} de {Fecha.year}
        </div>
        <div>
          <Button
            className="font-light bg-transparent border-1 text-white"
            radius="full"
          >
            Mes
          </Button>
          <Button
            className="font-light bg-transparent border-1 text-white"
            radius="full"
          >
            Semana
          </Button>
          <Button
            className="font-light bg-transparent border-1 text-white"
            radius="full"
          >
            Día
          </Button>
        </div>
      </div>
      <Week />
    </>
  );
}
