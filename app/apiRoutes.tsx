import {
  ApiResponse,
  AuthorsApi,
  CategoriaApi,
  CitasPendientesApiResponse,
  PsicologoApiResponse,
  PsicologoApiResponseAlone,
  PsicologoPreviewData,
  AdministradorApiResponse,
  AdministradorApiResponseAlone,
  AdministradorPreviewData,
  AdministradorFormData,
} from "@/interface";
import { parseCookies } from "nookies";
import React, { useState, useEffect } from 'react';
export const token = parseCookies()["session"];

export async function BlogsWebSite(): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/blogs`);
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  const result: ApiResponse = await res.json();
  return result;
}


export async function GetCagetories(): Promise<CategoriaApi> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/categorias`
  );
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  const result: CategoriaApi = await res.json();

  return result;
}

export async function GetBlogsPreviewApi(): Promise<AuthorsApi> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/blogs/authors`
  );
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  const result: AuthorsApi = await res.json();

  return result;
}

export async function GetPsicologos(): Promise<PsicologoApiResponse> {
  const res = await fetch(

    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos`

  );
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  const result: PsicologoApiResponse = await res.json();

  return result;
}


export async function DeletePsycologo(id: number | null): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al eliminar el psicologo");
  }
}

export async function GetPsicologosById(
  id: number | null
): Promise<PsicologoApiResponseAlone> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener el psicologo");
  }
  const result: PsicologoApiResponseAlone = await res.json();
  return result;
}

export async function UpdatePsicologo(
  id: number | null,
  data: PsicologoPreviewData
): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
   
    throw new Error("Error al actualizar el psicologo");
    
  }
}

export async function GetCitasPendientes(
  id: number | null
): Promise<CitasPendientesApiResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/citas/pendientes/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener el psicologo");
  }
  const result: CitasPendientesApiResponse = await res.json();
  return result;
}
{/* api de administradores */}

export async function GetAdministradores(): Promise<AdministradorApiResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/administradores`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
  
  if (!res.ok) {
    throw new Error("Error al obtener los administradores");
  }
  
  const result: AdministradorApiResponse = await res.json();
  return result;
}

export async function GetAdministradorById(
  id: number | null
): Promise<AdministradorApiResponseAlone> {
  if (!id) throw new Error("ID de administrador no proporcionado");
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/administradores/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Error al obtener el administrador");
  }
  
  const result: AdministradorApiResponseAlone = await res.json();
  return result;
}

export async function CreateAdministrador(
  data: AdministradorPreviewData
): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/administradores`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al crear el administrador");
  }
}

export async function UpdateAdministrador(
  id: number | null,
  data: Partial<AdministradorPreviewData>
): Promise<void> {
  if (!id) throw new Error("ID de administrador no proporcionado");
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/administradores/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar el administrador");
  }
}

export async function DeleteAdministrador(id: number | null): Promise<void> {
  if (!id) throw new Error("ID de administrador no proporcionado");
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/administradores/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar el administrador");
  }
}

export async function ChangeAdministradorStatus(
  id: number | null
): Promise<void> {
  if (!id) throw new Error("ID de administrador no proporcionado");
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/administradores/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al cambiar estado del administrador");
  }
}

