"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DesktopNavUser } from "./DesktopNavUser";
import { Icons } from "@/icons";

import { MobileNavbar } from "./MobileNavbarUser";

const navItems = [

  {
    name: "Registro de personal",
    link: "/user/personal",
    icono:Icons.personal,
  },
  {
    name: "Psicologos",
    link: "/user/psicologos",
    icono: Icons.psicologos,
  },

  {
    name: "Politicas y Privacidad",
    link: "/",
    icono: Icons.politicasyPriv,
  },
];

const NavbarUser = () => {




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

export default NavbarUser;
