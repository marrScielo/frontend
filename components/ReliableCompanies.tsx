"use client";

import Image from "next/image";

const Companies = [
  {
    icon: (
      <Image
        src={"/Companies/LogoTAMI.webp"}
        alt="especialista"
        width={98}
        height={114}
      />
    ),
  },
  {
    icon: (
      <Image
        src={"/Companies/YUNTAS.webp"}
        alt="especialista"
        width={114}
        height={114}
      />
    ),
  },
  {
    icon: (
      <Image
        src={"/Companies/ASDEN.webp"}
        alt="especialista"
        width={126}
        height={114}
      />
    ),
  },
  {
    icon: (
      <Image
        src={"/Companies/LOGONLS.webp"}
        alt="especialista"
        width={138}
        height={104}
      />
    ),
  },
  {
    icon: (
      <Image
        src={"/Companies/DigiLogo.webp"}
        alt="especialista"
        width={114}
        height={114}
      />
    ),
  },
  {
    icon: (
      <Image
        src={"/Companies/NHLLOGO.webp"}
        alt="especialista"
        width={93}
        height={114}
      />
    ),
  },
];

export default function RealiableCompanies() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background mt-8">
      <p className="text-title text-4xl font-bold w-[643px] mx-auto text-center">
        Empresas que confían en nuestra orientación psicológica
      </p>
      <div className="flex flex-wrap justify-center gap-24 mt-16 mb-28">
        {Companies.map((company, index) => (
          <div key={index}>
            <div className="p-4">
              {company.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
