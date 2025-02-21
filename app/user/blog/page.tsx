'use client'

import BlogUsuarioCrear from "@/components/blogCrear/blogUsuarioCrear"
import CerrarSesion from "@/components/CerrarSesion"

export default function Blog() {
    return (
        <div>
            <div className="flex justify-between items-center w-full">
            <h1 className=" font-bold text-[32px] leading-[40px] ml-11 mb-5 mt-10 text-[#634AE2]  " >Blog</h1>
            <CerrarSesion />
            </div>
            <BlogUsuarioCrear />
        </div>
    )
}