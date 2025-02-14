'use client';
import {Image, User } from "@heroui/react";
import Link from "next/link";

export default function BlogPreview() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2">
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            }}
            name={
              <span className="text-sm md:text-base leading-tight">
                Jhon Angelo Sánchez Garcia
              </span>
            }
          />
          <p className="text-xl md:text-2xl pt-2 md:pt-3 pb-1 md:pb-2 font-semibold">
           <Link href={"blog/revista"} > Estrategias Efectivas para Mejorar la Autoestima</Link>
          </p>
          <p className="text-base md:text-xl leading-relaxed md:leading-7 line-clamp-3 md:h-20">
            La adolescencia es una etapa de grandes cambios y desafíos. Durante este periodo, se experimenta...
          </p>
          
        </div>
        <div className="md:col-span-1 flex items-center justify-center">
          <Image
            src="/CarruselInferiorMain/abuela.webp"
            isZoomed
            alt="Profile"
            className="w-full md:w-auto"
            width={178}
            height={153}
            radius="none"
          />
        </div>
        <div className="col-span-1 md:col-span-3">
        <p className="text-sm md:text-lg">Publicado el 17/07/2024</p>
        <hr className="my-6 md:my-9 border-t-[0.5px] max-w-[785px] border-[#9494F3]" />
        </div>
        
      </div>
    </>
  );
}