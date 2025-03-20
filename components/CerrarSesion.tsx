'use client';
import { Button } from "@heroui/react";
import { ThemeToggle } from "./Themetoggle";
import { useAuth } from "@/components/auth/loginsec";
import { useEffect, useState } from "react";
import { UsuarioLocalStorage } from "@/interface";

export default function CerrarSesion() {
  const { logout } = useAuth();
  const [user, setUser] = useState<UsuarioLocalStorage | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as UsuarioLocalStorage);
      }
    }
  }, []);

  return (
    <div className="flex flex-row justify-end items-center gap-x-5 mr-8">
      <ThemeToggle />
      {/*  <svg
        className="bg-[#634AE2] rounded-full"
        xmlns=" http://www.w3.org/2000/svg"
        height="32px"
        viewBox="0 -960 960 960"
        width="32px"
        fill="#FFFFFF"
      >
        <path d="M480-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160-220v-34q0-38 19-65t49-41q67-30 128.5-45T480-420q62 0 123 15.5T731-360q31 14 50 41t19 65v34q0 25-17.5 42.5T740-160H220q-25 0-42.5-17.5T160-220Z" />
      </svg>*/}
      <img src={user?.imagen} className="rounded-full w-8 h-8"></img>
      <Button
        radius="full"
        className="border-[#634AE2] text-[#634AE2] border-2 bg-[#fff0] h-8 mx-auto"
        onClick={logout}
      >
        Cerrar Sesión
      </Button>
    </div>
  );
}
