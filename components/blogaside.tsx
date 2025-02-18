import { Avatar, Button, Divider } from "@heroui/react";


const categorias = [
  { nombre: "Estrés" },
  { nombre: "Trastorno Obsesivo Compulsivo (TOC)" },
  { nombre: "Repulsión Sexual" },
  { nombre: "Ansiedad" },
  { nombre: "Depresión" },
  { nombre: "Fobias" },
  { nombre: "Trastorno de la Conducta Alimentaria" },
  { nombre: "Trastorno de Estrés Postraumático (TEPT)" },
  { nombre: "Trastornos del Sueño" },
  { nombre: "Trastorno de Ansiedad Generalizada" },
  { nombre: "Trastorno de Pánico" },
  { nombre: "Trastorno Bipolar" },
  { nombre: "Adicciones" },
  { nombre: "Trastorno de la Personalidad" },
  { nombre: "Trastorno de la Conducta" },
];
const autors = [
  {  
     imagen:"/logonombreblog.webp" ,
     nombre: "Jhon Angelo Sánchez Garcia" 
    },
  
  {      imagen:"/logonombreblog.webp" ,

    nombre: "Jhon Angelo Sánchez Garcia" },
];
export default function BlogAside() {
  return (
    <div className="w-[400px] p-4">
        <Divider orientation="vertical" />
      <p className="text-xl font-semibold text-[#634AE2]">Categorías</p>
      
      {categorias.map((item, index) => (
        <Button
          radius="full"
          className="bg-[#EAEAFF] m-2 text-base text-[#634AE2] hover:bg-[#C7B9FF] transition-all"
          key={index}
        >
          {item.nombre}
        </Button>
      ))}
      <p className="text-base font-normal pt-7 m-4 text-[#634AE2]">Por autor</p>
      {autors.map((item, index) => (
         <Button

         radius="full"
         className="bg-[#EAEAFF] pl-0.5 text-base text-[#634AE2] hover:bg-[#C7B9FF] transition-all"
         key={index}
       >
       <Avatar className="" src={item.imagen}/>
         {item.nombre}
       </Button>
    ))}      
      </div>
  );
}
