import ReservarComponentSearch from "./ReservarComponentSearch";
import ReservarPsiPreview from "./ReservarPsiPreview";

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
        <div className="flex justify-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-[0.8fr_2.5fr] h-full">
            <div className="col-span-0.8 pt-10">
                <ReservarComponentSearch />
            </div>
            <div className="col-span-2.5 pt-10 lg:grid-cols-2 grid grid-cols-1 ">
              <ReservarPsiPreview />
              <ReservarPsiPreview />
              <ReservarPsiPreview />
              <ReservarPsiPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
