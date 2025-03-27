"use client";
import BlogComplete from "@/components/blogcomplete";
import { BlogPreviewData } from "@/interface";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Revista() {
  const searchParams = useSearchParams();
  const blogId = searchParams.get('id');
  const [blogData, setBlogData] = useState<BlogPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!blogId) {
        setError("No se proporcionó ID de blog");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/blogs/show/${blogId}`
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setBlogData(data.result);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [blogId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blogData) return <div>No se encontró el blog</div>;

  return <BlogComplete data={blogData} />;
}