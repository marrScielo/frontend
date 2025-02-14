import { Button, Divider, Form, Image, User } from "@heroui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
const comentarios = [
  {
    id: 1,
    usuario: "Natalia Merino",
    comentario:
      "Muy buen y detallado artículo acerca de cómo mejorar nuesta autoestima. Un tema sumamente importante sin importar la edad de la persona. ¡Pondré todos estos tips en práctica!",
  },
  {
    id: 2,
    usuario: "Juan Flores",
    comentario:
      "Creo que es uno de los mejores artículos que he leído en relación al tema. Es claro, conciso y bastante fácil de seguir y entender la lectura. Gracias por la información.",
  },
];
const textos = [
  {
    id: 1,

    text: " La autoestima es un aspecto crucial de nuestro bienestar mental y emocional. Tener una buena autoestima significa reconocer y valorarnuestras capacidades y logros, mientras que una baja autoestima puedeafectar negativamente nuestras relaciones, rendimiento y calidad de vida. A continuación, te presentamos algunas estrategias efectivas para mejorar y fortalecer tu autoestima. <br/> <br/><strong> Practica la Autoaceptación</strong><br/>  Acepta tus imperfecciones y comprende que todos cometemos errores. La autoaceptación es el primer paso hacia una autoestima saludable. Haz una lista de tus fortalezas y áreas de mejora y trabaja en ellas sin juzgarte.<br/><br/><b> Establece Metas Realistas</b><br/> Fija objetivos alcanzables y celebra tus logros, por pequeños que sean. Establecer metas realistas te permite experimentar el éxito, lo cual refuerza tu confianza en ti mismo.<br/><br/><b> Desarrolla Habilidades Nuevas</b><br/>  Aprender nuevas habilidades o mejorar las existentes puede aumentar tu sentido de competencia y autoeficacia. Participa en actividades que te interesen y desafíen.<br/><br/><b>Rodeate de Personas Positivas </b><br/>Las relaciones saludables y de apoyo pueden tener un gran impacto en tu autoestima. Rodéate de personas que te valoren y te animen a ser tu mejor versión. <br/><br/><b>Cuida de Tu Salud Física</b><br/> El ejercicio regular, una dieta equilibrada y un buen sueño son fundamentales para mantener un equilibrio físico y mental. Cuidar de tu cuerpo también mejora tu percepción de ti mismo.<br/><br/><b> Practica la Autocompasión </b><br/>Sé amable contigo mismo en momentos de dificultad. La autocompasión implica tratarte con la misma amabilidad y comprensión con la que tratarías a un amigo cercano.<br/><br/><b> Evita Compararte con Otros</b><br/> Cada persona tiene su propio camino y sus propias luchas. Compararte con los demás puede ser dañino. Enfócate en tu propio crecimiento y progreso. <br/><br/><b>Busca Ayuda Profesional</b><br/> Si sientes que tus esfuerzos no son suficientes, considera buscar la ayuda de un terapeuta o consejero. La terapia puede proporcionarte herramientas y perspectivas valiosas para mejorar tu autoestima. ",
  },
];

const artículo=[
  {
    id:1,
    imagen:"/CarruselInferiormain/Azul.webp",
    titulo:"Estrategias Efectivas para Mejorar la Autoestima",
    descripcion:"La autoestima es un aspecto crucial de nuestro bienestar mental y emocional.",
    fecha:"Publicado el 17/07/2024"
  },{
    id:2,
    imagen:"/CarruselInferiorMain/abuela.webp",
    titulo:"Causas de la depresión en la adolescencia",
    descripcion:"La adolescencia es una etapa de grandes cambios y desafíos.",
    fecha:"Publicado el 17/07/2024"
  },
  
]
export default function BlogComplete() {
  return (
    <>
    
      <div className="max-w-7xl w-full flex flex-col items-center mx-auto">
      <div className="w-full flex flex-col items-start"> 
      <div className="flex items-center gap-2 pb-12 pt-6">
      <Link href="/blog">
      <ArrowLeft color="#634AE2" />      </Link>

      <h1 className="text-[#634AE2] text-4xl font-semibold -ml-0 "
   
      >Blog</h1>
    </div>
          <Button
            radius="full"
            className="bg-[#EAEAFF] m-2 text-base text-[#634AE2]"
          >
            Autoestima
          </Button>
        </div>

        <div className="text-[#634AE2]">
          <p className="font-semibold text-[64px] leading-[80px] ">
            Estrategias Efectivas para Mejorar la Autoestima
          </p>
          <User
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
              size: "lg",
            }}
            name={
              <p className="text-sm font-normal ml-2 pt-8 md:text-base">
                Jhon Angelo Sánchez Garcia
              </p>
            }
            description={
              <p className="text-[#634AE2] text-[14px] ml-2 pt-4 leading-[20px] font-extralight">
                Publicado el 17/07/2024
              </p>
            }
          />
          <Divider className="max-w-7xl mt-8" />
        </div>
      </div>
      <div className="w-full ">
        <Image
          className="pt-9 rounded-none"
          src="/CarruselInferiormain/brazos.webp"
          alt="blogfondo"
          width="100%"
          height={"auto"}
        />
      </div>
      <div className="max-w-7xl w-full  justify-center mx-auto">
        {textos.map((item, index) => (
          <p
            key={index}
            className="text-2xl my-8 text-[#634AE2] "
            dangerouslySetInnerHTML={{ __html: item.text }}
          />
        ))}

        <Divider className="max-w-7xl " />
        <h1 className="  text-[#634AE2] my-8 text-[24px] leading-[36px] font-semibold">
          Comentarios(12)
        </h1>
        <Form>
          <div className="relative w-full">
            <input
              className="bg-[#EAEAFF] h-14 w-full border-none rounded-full px-6 pr-[110px] text-[rgb(99,74,226)] placeholder-[#634AE2] placeholder:text-start outline-none focus:ring-0 focus:outline-none"
              placeholder="Cuéntanos tu opinión..."
            />
            <Button className="absolute right-6 text-[16px] leading-[36px] w-[157px] top-1/2 py-1 transform -translate-y-1/2 bg-[#634AE2] text-white font-medium rounded-full">
              Comentar
            </Button>
          </div>
        </Form>
        {comentarios.map((item,index)=>(
          <div key={index} className="text-[#634AE2] py-10">
          <h1  className="font-semibold text-xl  ">{item.usuario}</h1>
          <p className="pb-1 text-lg">{item.comentario}</p>
          <a href="/contacto" className="underline ">Responder</a>
          </div>
        ))}
        <Button className="rounded-full text-[16px] bg-white text-[#634AE2] h-10 px-7 border  border-[#634AE2]
         leading-9 ">Ver todas las respuestas</Button>
      
      </div>
      <div
  className="h-[600px] w-full mt-16 bg-[#EAEAFF] text-[#634AE2] "
>
  <div className=" justify-center mx-auto">
  <p className="font-semibold text-2xl ml-[234px] items-center mx-auto py-[32px]">
    Artículos relacionados
  </p>
  <div
    className="flex flex-col md:flex-row items-center justify-center gap-16 "
  >
    {artículo.map((item, index) => (
      <div key={index} className="flex flex-col w-[500px]">
        <Image src={item.imagen} alt={item.titulo} height={336} width={480} />
        <p className="font-semibold text-2xl h-16 mt-4">{item.titulo}</p>
        <p className="text-base mt-2 h-20">{item.descripcion}</p>
        <p className="text-xs">{item.fecha}</p>
      </div>
    ))}
  </div>
</div>
</div>

    </>
  );
}
