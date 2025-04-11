/*import { Authors, Categoria } from "@/interface";
import { Avatar, Button } from "@heroui/react";

export default function BlogAside({
  Categories,
  Authors,
  onCategoryClick,
  onAuthorClick,
  activeCategory,
  activeAuthor
}: {
  Categories: Categoria[];
  Authors: Authors[];
  onCategoryClick: (categoryId: number) => void;
  onAuthorClick: (authorId: number) => void;
  activeCategory: number | null;
  activeAuthor: number | null;
}) {
  const authorsArray = Array.isArray(Authors) ? Authors : [];

  return (
    <div className="w-[400px] p-4">
      <p className="text-lg font-normal text-[#634AE2] mb-6">Categorías</p>

      <div className="grid md:grid-cols-2 grid-cols-3 gap-2 mr-9">
        {categorias.map((item, index) => (
          <Button
            radius="full"
            className={`bg-[#EAEAFF] md:text-base text-[#634AE2] hover:bg-[#C7B9FF] transition-all whitespace-nowrap ${
              item.nombre.length > 15 ? "col-span-2" : ""
            }`}
            key={index}
            style={{ maxWidth: "27vh", minWidth: "12vh" }} 

          >
            {item.nombre}
          </Button>
        ))}
      </div>

      <p className="text-base font-normal pt-7 m-4 text-[#634AE2]">Por autor</p>
      {authorsArray.length > 0 ? (
        authorsArray.map((item) => (
          <Button
            radius="full"
            className={`${
              activeAuthor === item.id
                ? "bg-[#634AE2] text-white"
                : "bg-[#EAEAFF] text-[#634AE2]"
            } pl-0.5 text-base hover:bg-[#C7B9FF] transition-all mb-2`}
            key={item.id}
            onClick={() => onAuthorClick(item.id)}
          >
            <Avatar className="" src={item.photo} />
            {item.name} {item.lastname}
          </Button>
        ))
      ) : (
        <p className="text-sm text-gray-500">No hay autores disponibles</p>
      )}
    </div>
  );
}*/