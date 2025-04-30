'use client';

import { GetAdministradores } from "@/app/apiRoutes";
import CerrarSesion from "@/components/CerrarSesion";
import LoadingPages from "@/components/LoadingPages";
import AllAdministradores from "@/components/User/Administradores/AllAdministradores";
import { AdministradorApiResponse } from "@/interface";
import { useEffect, useState } from "react";

export default function AdministradoresPage() {
  const [data, setData] = useState<AdministradorApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await GetAdministradores();
        setData(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar administradores');
        console.error('Error fetching Administradores:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingPages />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        <h2>Error cargando administradores</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#634AE2]">
          Administradores
        </h1>
        <CerrarSesion />
      </div>
      
      {data?.result && data.result.length > 0 ? (
        <AllAdministradores Data={data.result} />
      ) : (
        <div className="text-center py-8">
          <p>No se encontraron administradores registrados</p>
        </div>
      )}
    </div>
  );
}