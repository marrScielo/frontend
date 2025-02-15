
import ReservarComponentSearch from "./ReservarComponentSearch";
import ProfileView from "./ProfileView";

export default function Profile() {
  return (
    <div className="flex justify-center text-[#634AE2] ">
      <div className="w-full max-w-7xl">
        <div className=" justify-center ml-20">
           <h1 className="text-start pt-10 text-3xl font-bold ">
            La mejor inversión es en ti mismo ¡Comienza tu proceso hoy! 
           </h1>
           <h5 className="text-start font-light text-[24px] leading-[33px]  ">
          Agenda tu sesión con un psicólogo en línea, fácil, seguro y privado
          </h5>
        </div>
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-[0.8fr_2.5fr] h-full ">
            <div className="col-span-0.8 ">
                <ReservarComponentSearch />
            </div>
            <div className="col-span-2.5 lg:grid-cols-2 grid grid-cols-1 justify-center w-[840px] h-[660px] mx-auto">
              <ProfileView/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
