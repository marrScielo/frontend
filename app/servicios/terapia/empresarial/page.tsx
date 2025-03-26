import ServicesStructure from "@/components/Services/ServicesStructure"
import { ServicesStructureProps } from "@/interface"
 const FamilyTerapias:ServicesStructureProps[] =[{
  title: "Terapia empresarial",
  edad: "",
  motto:
    "¿Tu empresa enfrenta altos niveles de estrés y conflictos internos? Impulsa el bienestar de tu equipo con nuestra terapia empresarial",
  background: "/Services/business/buisness.webp",
  bgdown:"/Services/business/bg2.webp",
  bgup:"/Services/business/bgtiny.webp",
  description:
    "Ayudamos a equipos y líderes a gestionar el estrés, mejorar la comunicación y fortalecer un ambiente laboral saludable. A través de sesiones económicas y personalizadas, promovemos un entorno más equilibrado y productivo para todos.",
  tittleIcon:
    "En Contigo Voy, puedes encontrar especialistas en psicología organizacional para abordar una gran variedad de temas.",
  iconos: [
    {
      id: 1,
      text: "Estrés laboral",
      iconImage: "/Services/business/therapy/estres.webp",
    },
    {
      id: 2,
      text: "Cambios en el estado de animo",
      iconImage: "/Services/business/therapy/estados.webp",
    },
    {
      id: 3,
      text: "Dificultad para concentrarse",
      iconImage: "/Services/business/therapy/dificultad.webp",
    },
    {
      id: 4,
      text: "Síndrome de desgaste profesional",
      iconImage: "/Services/business/therapy/sindrome.webp",
    },
    {
      id: 5,
      text: "Síndrome del trabajador burbuja",
      iconImage: "/Services/business/therapy/burbuja.webp",
    },
  ],
  tittlecards: "Beneficios de la terapia empresarial",
  cards: [
    {
      id: 1,
      text: "Colaboradores con menos índices de estrés",
      icon: "/Services/business/colaboradores.webp",
    },
    {
      id: 2,
      text: "Incremento en la productividad",
      icon: "/Services/business/incremento.webp",
    },
    {
      id: 3,
      text: "Mejora en el clima laboral",
      icon: "/Services/business/clima.webp",
    },
    {
      id: 4,
      text: "Colaboradores con mayor gestión emocional",
      icon: "/Services/business/mayor.webp",
    },
    {
      id: 5,
      text: "Disminución de la rotación de personal",
      icon: "/Services/business/disminucion.webp",
    },
  ],
  textfooter:
    "¿Te atreves a revolucionar tu ambiente laboral y motivar a tu equipo como nunca antes?",
}

]

export default function Home() {


  return <ServicesStructure services={FamilyTerapias} />

  }