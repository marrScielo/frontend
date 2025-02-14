import ServicesStructure from "@/components/Services/ServicesStructure"
import { ServicesStructureProps } from "@/interface"

 const ParejaTerapias:ServicesStructureProps[] =[{

  title: "Terapia de pareja",
  edad: "Para parejas de toda edad",
  motto: "¿Tu relación está en crisis? ¿Buscas fortalecer el vínculo?",
  background: "/Services/couple/bgcouple.webp", 
  bgdown:"/Services/couple/bgdownpareja.webp",
  description:
    "Todas las parejas enfrentan desafíos y buscar ayuda es un paso hacia una relación más satisfactoria. En Contigo Voy, pueden iniciar una terapia de pareja online diseñada para cuidar su bienestar de forma accesible y práctica.",
  tittleIcon:
    "En Contigo Voy puedes encontrar un psicólogo de parejas online para abordar una gran variedad de temas.",
  iconos: [
    {
      id: 1,
      text: "Sexualidad",
      iconImage: "/Services/couple/sexualidad.webp",
    },
    {
      id: 2,
      text: "Problemas de comunicación",
      iconImage: "/Services/couple/problemascomuni.webp",
    },
    {
      id: 3,
      text: "Celos",
      iconImage: "/Services/couple/celos.webp",
    },
    {
      id: 4,
      text: "Familia",
      iconImage: "/Services/couple/familia.webp",
    },
    {
      id: 5,
      text: "Dependencia emocional",
      iconImage: "/Services/couple/dependencia.webp",
    },
  ],
  tittlecards: "Beneficios de la terapia de parejas",
  cards: [
    {
      id: 1,
      text: "Aprenderán a comunicarse y expresar sus emociones de manera clara y efectiva, fortaleciendo el entendimiento mutuo.",
      icon: "/Services/couple/therapy/comunicarse.webp",
    },
    {
      id: 2,
      text: "Incrementará la satisfacción y el bienestar, no solo en la relación, sino también a nivel personal.",
      icon: "/Services/couple/therapy/satisfaccion.webp",
    },
    {
      id: 3,
      text: "Desarrollarán una empatía más profunda para comprender y atender mejor las necesidades de su pareja.",
      icon: "/Services/couple/therapy/empatia.webp",
    },
    {
      id: 4,
      text: "Mejorarán su empatía, facilitando el respeto hacia sus diferencias y promoviendo la armonía.",
      icon: "/Services/couple/therapy/armonia.webp",
    },
    {
      id: 5,
      text: "Construirán su mejor versión individual para crecer y avanzar juntos como pareja.",
      icon: "/Services/couple/therapy/avanza.webp",
    },
  ],
  textfooter: "¿Listos para fortalecer su relación y crecer juntos?",
},


]

export default function Home() {


  return <ServicesStructure services={ParejaTerapias} />

  }