"use client";

import Login from "@/components/login";

export default function Logeo() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen "
      style={{
        backgroundImage: `linear-gradient(to right,rgba(54,22,216, 0.64), rgba(120,99,227, 0.48))`,
      }}
    >
      <div
        className="rounded-2xl h-[500px] lg:w-96 w-64 bg-[#FFFFFF] flex flex-col items-end pt-10"
        style={{
          backgroundImage: `url(/newlog.webp)`,
          backgroundPosition: "center left",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="font-semibold lg:text-3xl text-2xl text-[#634AE2] lg:mr-8 mr-6">
           Iniciar
          <br className="lg:hidden" /> Sesión
        </h1>
        <div className="transform translate-x-1/2 mt-10">
          <Login />
        </div>
      </div>
    </div>
  );
}
