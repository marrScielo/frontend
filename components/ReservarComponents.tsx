
import ReservarComponentSearch from "./ReservarComponentSearch";
import ReservarPsiPreview from "./ReservarPsiPreview";

const Psicologo = [
  {
    id:1,
    name: "Nombre",
    lastname: "Apellidos",
    description: "Epecialidad / Maestría / Doctorado <br/> + 4 Años de experiencia",
    img: "https://github.com/shadcn.png",
    flag: "MX",
    link: "https://github.com/shadcn.png",
    information:"Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties:[{id:1,texto:"TDAH"},{id:2,texto:"Dislexia"},{id:3,texto:"Aprendizaje"}],
  },
  {
    id:2,
    name: "Nombre",
    lastname: "Apellidos",
    description: "Epecialidad / Maestría / Doctorado <br/> + 1 Año de experiencia",
    flag: "PE",
    img: "https://github.com/shadcn.png",
    link: "https://github.com/shadcn.png",
    information:"Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties:[{id:1,texto:"TDAH"},{id:2,texto:"Dislexia"},{id:3,texto:"Aprendizaje"}],
  },
  {
    id:3,
    name: "Nombre",
    lastname: "Apellidos",
    description: "Epecialidad / Maestría / Doctorado <br/> + 3 Años de experiencia",
    flag: "US",
    img: "https://github.com/shadcn.png",
    link: "https://github.com/shadcn.png",
    information:"Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties:[{id:1,texto:"Transtorno"},{id:2,texto:"Ansiedad"},{id:3,texto:"Biporalidad"}],
  },
  {
    id:4,
    name: "Nombre",
    lastname: "Apellidos",
    description: "Epecialidad / Maestría / Doctorado <br/> + 2 Años de experiencia",
    flag: "AR",
    img: "https://github.com/shadcn.png",
    link: "https://github.com/shadcn.png",
    information:"Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties:[{id:1,texto:"TDAH"},{id:2,texto:"Dislexia"},{id:3,texto:"Aprendizaje"}],
  },
  
];

export default function ReservarComponents() {
  return (
    <div className="flex justify-center text-[#634AE2]">
      <div className="w-full max-w-7xl">
        <h1 className="text-start pt-10 text-3xl font-bold ">
          La mejor inversión es en ti mismo ¡Comienza tu proceso hoy!
        </h1>
        <h5 className="text-start font-light text-[24px] leading-[33px]  ">
          Agenda tu sesión con un psicólogo en línea, fácil, seguro y privado
        </h5>
        <div className="flex justify-center mt-8 ">
          <div className="grid grid-cols-5 grid-rows-5 gap-2">
            <div className="row-span-5 col-span-1 ">
              <ReservarComponentSearch />
            </div>
            <div className="row-span-4 col-span-4 ml-5 ">
              <div className="grid grid-cols-4 grid-row-5 gap-5">
                {Psicologo.map((Item, index) => (
                  <div  key={index} className="row-span-1 col-span-2">
                    <ReservarPsiPreview  psicologo={Item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
