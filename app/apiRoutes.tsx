import {
  ApiResponse,
  AuthorsApi,
  CategoriaApi,
  PsicologoApiResponse,
  PsicologoApiResponseAlone,
  PsicologoPreviewData,
} from "@/interface";
import { parseCookies } from "nookies";
export const token = parseCookies()["session"];

export async function BlogsWebSite(): Promise<ApiResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/blogs/getAll`);
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  const result: ApiResponse = await res.json();
  return result;
}

export async function GetCagetories(): Promise<CategoriaApi> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/categorias/show`
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
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/showAll`
  );
  if (!res.ok) {
    throw new Error("Error al obtener los datos");
  }
  const result: PsicologoApiResponse = await res.json();

  return result;
}

export async function DeletePsycologo(id: number | null): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/delete/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/show/${id}`,
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
    `${process.env.NEXT_PUBLIC_API_URL}api/psicologos/update/${id}`,
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
