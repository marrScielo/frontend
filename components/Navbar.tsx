"use client";
import Link from "next/link";
import React from "react";

import { DesktopNav } from "./DesktopNav";
import Image from "next/image";

const navItems = [
  {
    name: "Inicio",
    link: "/",
  },
  {
    name: "Sobre Nosotros",
    link: "/sobreNosotros",
  },
  {
    name: "Servicios",
    link: "/#",
  },
  {
    name: "Contáctanos",
    link: "/contactanos",
  },
  {
    name: "Preguntas Frecuentes",
    link: "/PreguntasFrecuentes",
  },
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Equipo Profesional",
    link: "/ReservarCita",
  },
  {
    name: "Iniciar Sesión",
    link: "/login",
    isButton: true,
  },
];

const Navbar = () => {
  return (
    <nav className="bg-background h-[10vh] flex items-center fixed w-full z-40 top-0">
      <div className="w-full p-6 flex items-center justify-between">
        <Link href="/" className="pl-10 z-0">
          <Image
            src="/LOGO.webp"
            alt="Company Logo"
            width={175}
            height={50}
            priority
            suppressHydrationWarning
          />
        </Link>
        <div className="flex items-center gap-x-5">
          <DesktopNav navItems={navItems} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;