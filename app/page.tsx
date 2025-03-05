import ChooseUs from "@/components/main/chooseUs";
import OnlinePsychology from "@/components/main/onlinePsychology";
import TherapyServices from "@/components/main/therapyServices";
import MainSlider from "@/components/mainslider";
import RealiableCompanies from "@/components/ReliableCompanies";
import { metadataTarron } from "./metadata";

export const metadata = {
  ...metadataTarron,
  title: "Inicio - ContigoVoy", 
};


export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-hidden">
  <MainSlider />
  <TherapyServices />
  <ChooseUs />
  <RealiableCompanies />
  <OnlinePsychology />
</div>

  );
}
