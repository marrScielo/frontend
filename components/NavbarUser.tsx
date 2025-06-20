"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Icons } from "@/icons";



const navItems = [
  {
    name: "Dashboard",
    link: "/user/dashboard",
    icono: Icons.dashboard,
  },
  {
    name: "Registro de personal",
    link: "/user/personal",
    icono: Icons.personal,
  },
  {
    name: "Pacientes",
    link: "/user/pacientes",
    icono: Icons.pacientes,
  },
  {
    name: "Psicologos",
    link: "/user/psicologos",
    icono: Icons.psicologos,
  },
  {
    name: "Citas",
    link: "/user/citas",
    icono: Icons.citas,
  },
  {
    name: "Historial",
    link: "/user/historial",
    icono: Icons.historial,
  },
  {
    name: "Calendario",
    link: "/user/calendario",
    icono: Icons.calendario,
  },
  {
    name: "Estadisticas",
    link: "/user/estadisticas",
    icono: Icons.estadisticas,
  },
  {
    name: "Blog",
    link: "/user/blog",
    icono: Icons.blog,
  },
  {
    name: "Marketing",
    link: "/user/marketing",
    icono: Icons.marketing,
  },
  {
    name: "Politicas y Privacidad",
    link: "/user/politicasPriva",
    icono: Icons.politicasyPriv,
  },
];

const NavbarUser = () => {
  const [estado, setEstado] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      panelRef.current &&
      !panelRef.current.contains(event.target as Node) &&
      userRef.current &&
      !userRef.current.contains(event.target as Node)
    ) {
      setEstado(false);
      console.log(estado);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex flex-row">
      {/* Navbar Mobile*/}
      

      {/* Navbar */}
      <div className="hidden lg:flex w-72 h-screen fixed">
        <div className="bg-background w-full h-full rounded-tr-3xl pt-7 flex flex-col">
          <Link href="/">
            <h1 className="font-normal text-3xl flex justify-center items-center">
              <Image
                src={"/LOGO.webp"}
                width={200}
                height={150}
                alt="logonava"
              />
            </h1>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
