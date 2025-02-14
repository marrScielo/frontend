import ServicesStructure from "@/components/Services/ServicesStructure"
import { ServicesStructureProps } from "@/interface"

const NinosTerapias:ServicesStructureProps[] =[{

  title: "Terapia para niños",
    edad: "De 3 a 12 años de edad",
    motto:
      "¿Por qué no darle a tu pequeño la oportunidad de crecer emocionalmente con la ayuda de un profesional?",
    background: "/Services/niños/childs.webp",
    bgdown:"/Services/niños/bgdowninfante.webp",
    description:
      "  Ayuda a tu hijo a superar sus desafíos emocionales con nuestra terapia infantil. Apoyamos a los niños a comprender y manejar sus emociones, mejorando su bienestar de manera accesible y con la participación activa de los padres en cada sesión online.  ",
    tittleIcon:
      "En Contigo Voy, puedes encontrar a un psicólogo infantil online para ayudar a tu hijo a enfrentar una variedad de temas.",
    iconos: [
      {
        id: 1,
        text: "Dificultades en el desarrollo del lenguaje",
        iconImage: "/Services/niños/lenguaje.webp",
      },
      {
        id: 2,
        text: "Habilidades sociales",
        iconImage: "/Services/niños/sociales.webp",
      },
      {
        id: 3,
        text: "Manejo de la fustración",
        iconImage: "/Services/niños/frustracion.webp",
      },
      {
        id: 4,
        text: "Vinculo de apego",
        iconImage: "/Services/niños/apego.webp",
      },
      {
        id: 5,
        text: "Dificultades académicas",
        iconImage: "/Services/niños/academicas.webp",
      },
    ],
    tittlecards: "Beneficios de la terapia infantil",
    cards: [
      {
        id: 1,
        text: "Detecta y modifica patrones que afectan su desarrollo, promoviendo un crecimiento equilibrado.",
        icon: "/Services/niños/therapy/cerebro.webp",
      },
      {
        id: 2,
        text: "Mejora la interacción, promoviendo respeto, colaboración y relaciones positivas.",
        icon: "/Services/niños/therapy/charla.webp",
      },
      {
        id: 3,
        text: "Ayuda a los niños a desarrollar una imagen positiva, promoviendo su felicidad y confianza.",
        icon: "/Services/niños/therapy/positiva.webp",
      },
      {
        id: 4,
        text: "Enseña a los niños a manejar sus emociones y enfrentar desafíos con resiliencia.",
        icon: "/Services/niños/therapy/rompe.webp",
      },
      {
        id: 5,
        text: "Proporciona herramientas personalizadas para enfrentar dificultades y adaptarse asertivamente.",
        icon: "/Services/niños/therapy/herramientas.webp",
      },
    ],
    textfooter:
      "¿Tu pequeño enfrenta desafíos como falta de atención?¿Tiene una conducta agresiva?",
  }


]

export default function Ninos() {


  return <ServicesStructure services={NinosTerapias} />

  }