"use client";
import { NavbarPsi } from "@/components/User/NavbarPsi";
import NavbarUser from "@/components/User/NavbarUser";
import { ThemeProvider } from "@/components/theme-provider";
import { UsuarioLocalStorage } from "@/interface";
import { useState, useEffect, type ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  const [user, setUser] = useState<UsuarioLocalStorage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Solo ejecutar en el cliente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser) as UsuarioLocalStorage);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-[#eaeded] flex items-center justify-center">
          {/* Aquí puedes mostrar un spinner o mensaje de carga */}
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-[#eaeded]">
        {user?.rol === "ADMIN" ? <NavbarUser /> : <NavbarPsi />}

        <div className="min-h-[80vh] ml-20 lg:min-h-[89vh] lg:ml-72">
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
}
