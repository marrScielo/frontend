"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopNavUser } from "./DesktopNavUser";
import { Icons } from "@/icons";

import { MobileNavbar } from "./MobileNavbarUser";


const navItems = [
  
  {
    name: "Pacientes",
    link: "/user/pacientes",
    icono: Icons.pacientes,
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
    name: "Blog",
    link: "/user/blog",
    icono: Icons.blog,
  },
  
  
];

export const NavbarPsi = () => {
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
  });

  
  return (
    <div className="flex flex-row">
      {/* Navbar Mobile*/}
      <div className="lg:hidden z-[100]">
        <MobileNavbar navItems={navItems} />
      </div>

      {/* Navbar */}
      <div className="hidden lg:flex w-72 h-screen fixed">
        <div className="bg-background w-full h-full rounded-tr-3xl pt-7 flex flex-col">
          <Link href="/">
            <h1 className="font-normal text-3xl flex justify-center items-center">
              <Image src={"/LOGO.webp"} priority={true} width={200} height={150} alt="logo" />
            </h1>
          </Link>
          <div className="flex flex-col items-center mt-8 pt-7 mr-7">
            <DesktopNavUser navItems={navItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

