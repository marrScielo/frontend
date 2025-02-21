import ReservarComponentSearch from "./ReservarComponentSearch";
import ReservarPsiPreview from "./ReservarPsiPreview";

const Psicologo = [
  {
    id: 1,
    name: "Nombre",
    lastname: "Apellidos",
    description:
      "Epecialidad / Maestría / Doctorado <br/> + 4 Años de experiencia",
    img: "https://github.com/shadcn.png",
    flag: "MX",
    link: "https://github.com/shadcn.png",
    information:
      "Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties: [
      { id: 1, texto: "TDAH" },
      { id: 2, texto: "Dislexia" },
      { id: 3, texto: "Aprendizaje" },
    ],
  },
  {
    id: 2,
    name: "Nombre",
    lastname: "Apellidos",
    description:
      "Epecialidad / Maestría / Doctorado <br/> + 1 Año de experiencia",
    flag: "PE",
    img: "https://github.com/shadcn.png",
    link: "https://github.com/shadcn.png",
    information:
      "Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties: [
      { id: 1, texto: "TDAH" },
      { id: 2, texto: "Dislexia" },
      { id: 3, texto: "Aprendizaje" },
    ],
  },
  {
    id: 3,
    name: "Nombre",
    lastname: "Apellidos",
    description:
      "Epecialidad / Maestría / Doctorado <br/> + 3 Años de experiencia",
    flag: "US",
    img: "https://github.com/shadcn.png",
    link: "https://github.com/shadcn.png",
    information:
      "Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties: [
      { id: 1, texto: "Transtorno" },
      { id: 2, texto: "Ansiedad" },
      { id: 3, texto: "Biporalidad" },
    ],
  },
  {
    id: 4,
    name: "Nombre",
    lastname: "Apellidos",
    description:
      "Epecialidad / Maestría / Doctorado <br/> + 2 Años de experiencia",
    flag: "AR",
    img: "https://github.com/shadcn.png",
    link: "https://github.com/shadcn.png",
    information:
      "Licenciada Psicopedagogía con una amplia experiencia en estimulación cognitiva, orientación vocacional, técnicas de estudio y estrategias para mejorar memoria, atención y habilidades cognitivas. Además, brinda acompañamiento a familias y docentes para potenciar el desarrollo integral en cada etapa de la vida.",
    specialties: [
      { id: 1, texto: "TDAH" },
      { id: 2, texto: "Dislexia" },
      { id: 3, texto: "Aprendizaje" },
    ],
  },
];

export default function ReservarComponents() {
  return (
    <div className="flex justify-center text-[#634AE2]">
      <div className="w-full max-w-7xl">
        <h1 className="lg:text-start pt-10 lg:text-3xl font-bold text-center text-2xl">
          La mejor inversión es en
          <br className="block lg:hidden" /> ti mismo
          <br className="block lg:hidden" /> ¡Comienza tu proceso hoy!
        </h1>

        <h5 className="lg:text-start lg:mt-3 font-light lg:text-[24px]  text-center text-base mt-1">
          Agenda tu sesión con un psicólogo en
          <br className="block lg:hidden" /> línea, fácil, seguro y privado
        </h5>
        <div className="flex justify-center mt-8 px-4">
          <div className="grid grid-cols-1 grid-rows-auto gap-4 sm:grid-cols-5 w-full ">
            <div className="col-span-1 sm:row-span-5 sm:col-span-1 ">
              <ReservarComponentSearch />
            </div>
            <div className="sm:row-span-4 sm:col-span-4 ml-5 col-span-1 ">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
                {Psicologo.map((Item, index) => (
                  <div key={index} className="col-span-1 sm:col-span-2">
                    <ReservarPsiPreview psicologo={Item} />
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
