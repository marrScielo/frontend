"use client";
import CerrarSesion from "@/components/CerrarSesion";
export default function Logeo() {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#634AE2]"></h1>
          <CerrarSesion />
        </div>
        <p className="text-[#634AE2] font-bold text-3xl text-center pt-24">
          Bienvenido al Centro psicológico <br /> Contigo Voy
        </p>
      </div>
    </>
  )
}
