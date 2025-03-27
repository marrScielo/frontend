"use client";

import BlogUsuarioCrear from "@/components/blogCrear/blogUsuarioCrear";
import CerrarSesion from "@/components/CerrarSesion";

export default function Blog() {
  return (
    <div>
      <div className="flex justify-between  w-full mt-10 mb-6">
        <h1 className=" flex items-center font-bold text-[32px]  leading-[40px]  ml-11   text-[#634AE2]  ">
          Blog
        </h1>
        <CerrarSesion />
      </div>

      <BlogUsuarioCrear />
    </div>
  );
}
