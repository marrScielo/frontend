"use client";
import Image from "next/image";

export default function LoadingPages() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/newload.gif"
        alt="Loading"
        width={400}
        height={400}
        priority={true}
        loading="eager"
      />

      <p className="mt-2">Cargando...</p>
    </div>
  );
}
