"use client";
import CerrarSesion from "@/components/CerrarSesion";
import { Button } from "@heroui/react";

export default function CalendarioMain() {
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
      <div className="w-full h-16 bg-[#6364F4] items-center justify-start flex">
        <div className="ml-10 flex justify-between items-center w-full max-w-[230px]">
          <Button
            radius="full"
            className="bg-white text-[16px] leading-[20px] text-[#634AE2] font-bold"
          >
            Hoy
          </Button>
          <Button className="text-white text-[16px] leading-[20px] bg-white ">
            Mis Horarios
          </Button>
        </div>
      </div>
    </>
  );
}
