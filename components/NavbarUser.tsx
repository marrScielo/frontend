"use client";
import React, { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./Themetoggle";
import Link from "next/link";
import Image from "next/image";
import { DesktopNavUser } from "./DesktopNavUser";
import { Icons } from "@/icons";
import { UserInterface } from "@/interface";
import { fetchUser } from "@/utils/recuperarDataUser";
import { MobileNavbar } from "./MobileNavbarUser";

const navItems = [
  {
    name: "Dashboard",
    link: "/user/home",
    icono: Icons.dashboard,
  },
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
  const [user, setUser] = useState<UserInterface>({
    name: null,
    email: null,
    lastname: null,
    photo: null,
    iniciales: null,
  });
  useEffect(() => {
    fetchUser(setUser);
  }, []);
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
      <div className="lg:hidden">
        <MobileNavbar navItems={navItems} />
      </div>

      {/* Navbar */}
      <div className="hidden lg:flex w-72 h-screen fixed">
        <div className="bg-background w-full h-full rounded-tr-3xl pt-7 flex flex-col">
          <Link href="/">
            <h1 className="font-normal text-3xl flex justify-center items-center">
              <Image src={"/LOGO.webp"} width={200} height={150} alt="logo" />
            </h1>
          </Link>
          <div className="flex flex-col items-center mt-8 pt-7 mr-7">
            <DesktopNavUser navItems={navItems} />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="hidden lg:flex flex-1 ml-80 fixed">
        <div>
          <nav className="rounded-2xl mt-3 bg-[#eaeded] h-[12vh] flex items-center fixed z-10 top-6 w-[calc(95vw-270px)] p-4">
            <div className="flex items-start justify-between w-full">
              <div>
                <div className="text-4xl font-bold text-[#634AE2]">
                  <h1>
                    Buenos dias {user.name} {user.lastname}
                  </h1>
                </div>
                <div className="text-0xl font-normal text-[#634AE2] pt-1">
                  Preparate para un gran dia.
                </div>
                <div className="text-0xl font-bold text-[#634AE2]">
                  Tienes x citas programadas para hoy
                </div>
                <div className="text-0xl font-normal text-[#634AE2]">
                  Aprovecha para planificar tus próximos objetivos.
                </div>
              </div>
              {/* Contenedor de ThemeToggle y DataUser */}
              <div className="flex gap-x-5 mt-2">
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <div className="mt-[12vh] relative z-30"></div>
        </div>
      </div>
    </div>
  );
};

export default NavbarUser;
