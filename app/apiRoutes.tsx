import { ApiResponse, AuthorsApi, Categoria, CategoriaApi } from "@/interface";

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
