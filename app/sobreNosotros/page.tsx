import SobreNosotrosStructure from "@/components/SobreNosotrosStructure";
import { QuienesSomos } from "@/interface";

import { Metadata } from "next";

export	const metadata: Metadata = {
  title: "Sobre Nosotros - ContigoVoy",
  description: "Sobre nosotros y nuestro equipo",
};

const dataQS: QuienesSomos[] = [
  {
    quienesSomos:
      "Contigo Voy es un centro psicológico online dedicado al bienestar emocional en todas  las <br/> etapas de la vida. Contamos con un equipo de especialistas nacionales e internacionales <br/> que ofrecen terapia individual, de pareja y familiar, proporcionando un apoyo profesional <br/> personalizado para cada persona.",
    mision:
      "Nuestra misión es contribuir al bienestar emocional y mental de las personas <br/>mediante servicios de terapia psicológica online accesibles y de calidad.",
    vision:
      "Ser la plataforma líder en salud mental, facilitando un acceso más directo a las <br/> terapias y orientación psicológica. Nos comprometemos a ofrecer un servicio <br/>eficiente, garantizando apoyo emocional y bienestar para todos.",
    valor1:
      "Valoramos la capacidad de entender y compartir los sentimientos de nuestros <br/>clientes, ofreciendo un espacio donde se sientan escuchados y comprendidos.",
    valor2:
      "Nos comprometemos a crear un ambiente seguro y fiable, donde cada individuo <br/> pueda expresarse sin miedo al juicio y con total confidencialidad, fortaleciendo la <br/>relación entre psicólogos y pacientes.",
    valor3:
      "Mantenemos altos estándares en todos los aspectos de nuestro servicio, <br/> garantizando calidad y responsabilidad en cada interacción.",
  },
];

export default function Home() {
  return (
    <div
      className="w-full h-full pt-8"
      >
      <SobreNosotrosStructure qs={dataQS} />
    </div>
  );
}
