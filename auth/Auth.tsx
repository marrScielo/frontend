'use client';
//Usamo el hook useAuth para manejar el estado de la autenticación porque no podemos usar el middleware
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect } from "react";

export const useAuthRoutes = () => {
  
    const router = useRouter();
  useEffect(() => {
    // Verifica si la cookie 'session' existe
    const cookies = parseCookies();
    const session = cookies.session;

    if (!session) {
      // Si no hay sesión, redirige al login
        router.push("/login");
    }
  }, [router]);
};