import { Avatar, Button } from "@heroui/react";

const categorias = [
  { nombre: "Adicciones" },
  { nombre: "Ansiedad" },
  { nombre: "Atención" },
  { nombre: "Autoestima" },
  { nombre: "Crianza" },
  { nombre: "Depresión" },
  { nombre: "Enfermedades crónicas" },
  { nombre: "Estrés" },
  { nombre: "Impulsividad" },
  { nombre: "TOC" },
  { nombre: "Ira" },
  { nombre: "Terapia de pareja" },
  { nombre: "Sexualidad" },
  { nombre: "Traumas" },
  { nombre: "Riesgo suicida" },
  { nombre: "Sentido de vida" },
  { nombre: "Orientación vocacional" },
  { nombre: "Problemas alimenticios" },
  { nombre: "Relaciones interpersonales" },
];

const autores = [
  {
    imagen: "/logonombreblog.webp",
    nombre: "Jhon Angelo Sánchez Garcia",
  },
  {
    imagen: "/logonombreblog.webp",
    nombre: "Jhon Angelo Sánchez Garcia",
  },
];

export default function BlogAside() {
  return (
    <div className="w-[400px] p-4">
      {/* Sección de categorías */}
      <p className="text-lg font-normal text-[#634AE2] mb-6">Categorías</p>
      <div className="grid grid-cols-2 gap-2">
        {categorias.map((item, index) => (
          <Button
            radius="full"
            className={`bg-[#EAEAFF] text-base text-[#634AE2] hover:bg-[#C7B9FF] transition-all whitespace-nowrap ${
              item.nombre.length > 15 ? "col-span-2" : ""
            }`}
            key={index}
            style={{ maxWidth: "27vh" }} 
          >
            {item.nombre}
          </Button>
        ))}
      </div>

      <p className="text-base font-normal pt-7 m-4 text-[#634AE2]">Por autor</p>
      {autores.map((item, index) => (
        <Button
          radius="full"
          className="bg-[#EAEAFF] pl-0.5 text-base text-[#634AE2] hover:bg-[#C7B9FF] transition-all"
          key={index}
        >
          <Avatar className="" src={item.imagen} />
          {item.nombre}
        </Button>
      ))}
    </div>
  );
}
