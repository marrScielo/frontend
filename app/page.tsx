import ChooseUs from "@/components/main/chooseUs";
import OnlinePsychology from "@/components/main/onlinePsychology";
import TherapyServices from "@/components/main/therapyServices";
import MainSlider from "@/components/mainslider";
import RealiableCompanies from "@/components/ReliableCompanies";


export default function Home() {
  return (
    <div className="min-h-screen">
      <MainSlider/>
      <TherapyServices />
      <ChooseUs />
      <RealiableCompanies/>
      <OnlinePsychology />
    </div>
  );
}
