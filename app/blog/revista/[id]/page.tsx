"use client";
import BlogComplete from "@/components/blogcomplete";
import { BlogPreviewData } from "@/interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Revista() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<BlogPreviewData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/blogs/show/${orderId}`
        );
        const data = await response.json();
        console.log(data);
        setOrder(data.result);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchData();
  }, [orderId]);

  return (
    <>
    
      <BlogComplete  data={order as BlogPreviewData}/>
    </>
  );
}
