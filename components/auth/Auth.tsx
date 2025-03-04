'use client';

import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";

export const useAuthRoutes = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Verifica si la cookie 'session' existe
    const cookies = parseCookies();
    const session = cookies.session;

    if (!session) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return { isLoading }; 
};