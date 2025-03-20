

import { GetPsicologos, UpdatePsicolog } from "@/app/apiRoutes";
import CerrarSesion from "@/components/CerrarSesion";
import AllPsicologos from "@/components/User/psicologos/AllPsicologos";

export default async function Psicologos() {
  const Data = await GetPsicologos();
  return (
    <div>
      <div className="flex justify-between  w-full mt-10 mb-6">
        <h1 className=" flex items-center font-bold text-[32px]  leading-[40px]  ml-11   text-[#634AE2]  ">
          Psicologos
        </h1>

        <CerrarSesion />
      </div>
      <AllPsicologos Data={Data.result} />
  
    </div>
  );
}
