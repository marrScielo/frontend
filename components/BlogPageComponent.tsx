"use client";
import BlogAside from "./blogaside";
import { ScrollShadow } from "@heroui/react";
import BlogPreview from "./blogpreview";
import { Authors, BlogPreviewData, Categoria } from "@/interface";
import { useState } from "react";

export default function BlogPageComponent({
  Datos,
  Categories,
  Authors
}: {
  Datos: BlogPreviewData[];
  Categories: Categoria[];
  Authors: Authors[];
}) {
  const [filteredData, setFilteredData] = useState<BlogPreviewData[]>(Datos);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeAuthor, setActiveAuthor] = useState<number | null>(null);

  
  const handleCategoryFilter = (categoryId: number) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setFilteredData(
        activeAuthor 
          ? Datos.filter(blog => blog.psicologo?.includes(Authors.find(a => a.id === activeAuthor)?.name || ''))
          : Datos
      );
    } else {
      setActiveCategory(categoryId);
      const categoryName = Categories.find(cat => cat.idCategoria === categoryId)?.nombre;
      const filtered = Datos.filter(blog => blog.categoria === categoryName);
      setFilteredData(
        activeAuthor 
          ? filtered.filter(blog => blog.psicologo?.includes(Authors.find(a => a.id === activeAuthor)?.name || ''))
          : filtered
      );
    }
  };

  const handleAuthorFilter = (authorId: number) => {
    if (activeAuthor === authorId) {
      setActiveAuthor(null);
      setFilteredData(
        activeCategory 
          ? Datos.filter(blog => blog.categoria === Categories.find(cat => cat.idCategoria === activeCategory)?.nombre)
          : Datos
      );
    } else {
      setActiveAuthor(authorId);
      const author = Authors.find(a => a.id === authorId);
      
      const filtered = Datos.filter(blog => 
        blog.psicologo?.includes(author?.name || '')
      );
      setFilteredData(
        activeCategory 
          ? filtered.filter(blog => blog.categoria === Categories.find(cat => cat.idCategoria === activeCategory)?.nombre)
          : filtered
      );
    }
  };

  return (
    <div className="flex justify-center text-[#634AE2]">
      <div className="w-full max-w-7xl px-4">
        <h1 className="text-start py-5 md:text-3xl text-2xl leading-10 font-bold">
          Blog
        </h1>
        <div className="flex justify-center pb-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <ScrollShadow className="h-[870px]" hideScrollBar>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <BlogPreview key={item.idBlog} Data={item} />
                  ))
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-lg">No se encontraron blogs que coincidan con los filtros seleccionados.</p>
                  </div>
                )}
              </ScrollShadow>
            </div>

            <div className="col-span-1">
              <div className="my-2 md:my-4 md:border-l-[0.5px] border-[#634AE2]">
                <BlogAside 
                  Categories={Categories} 
                  Authors={Authors}
                  onCategoryClick={handleCategoryFilter}
                  onAuthorClick={handleAuthorFilter}
                  activeCategory={activeCategory}
                  activeAuthor={activeAuthor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}