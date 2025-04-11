
'use client';
import {
  BlogsWebSite,
  GetBlogsPreviewApi,
  GetCagetories,
} from "@/app/apiRoutes";

import BlogPageComponent from "@/components/BlogPageComponent";
import LoadingPages from "@/components/LoadingPages";
import {
  ApiResponse,
  AuthorsApi,
  CategoriaApi,
} from "@/interface";
import { useEffect, useState } from "react";

export default  function BlogPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [categoria, setCategoria] = useState<CategoriaApi | null>(null);
  const [authors, setAuthors] = useState<AuthorsApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const dato = await BlogsWebSite();
        const category = await GetCagetories();
        const author = await GetBlogsPreviewApi();
        setData(dato);
        setCategoria(category);
        setAuthors(author);
      } catch (error) {
        setError("Error obteniendo blogs");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {loading && <LoadingPages />}
      {error &&  <p className="flex items-center justify-center h-screen">{error}</p>}
      { data && categoria && authors &&
        <BlogPageComponent
          Datos={data.result}
          Categories={categoria.result}
          Authors={authors.result}
        />
      }
    </div>
  );
}
*/