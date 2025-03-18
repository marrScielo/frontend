

import ReservarComponents from "@/components/ReservarComponents"
import { GetPsicologos } from "../apiRoutes";

export default async function BlogPage() {
  const Data= await GetPsicologos();
  return (
    <div >
      <ReservarComponents  Psicologos={Data.result}/>
    </div>
  );
}
