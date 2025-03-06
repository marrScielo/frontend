"use client";

import Image from "next/image";


const enterprises = [
  {
    icon: "/Companies/LogoTAMI.webp",
    alt: "Tami",
    width: 98,
    height: 114,
  },
  {
    icon: "/Companies/YUNTASLogo.webp",
    alt: "Yuntas",
    width: 114,
    height: 114,
  },
  {
    icon: "/Companies/ASDEN.webp",
    alt: "Asden",
    width: 126,
    height: 114,
  },
  {
    icon: "/Companies/LOGONLS.webp",
    alt: "Nls",
    width: 138,
    height: 104,
  },
  {
    icon: "/Companies/DigiLogo.webp",
    alt: "Digimedia",
    width: 114,
    height: 114,
  },
  {
    icon: "/Companies/NHLLOGO.webp",
    alt: "Nhl",
    width: 93,
    height: 114,
  },
];

export default function RealiableCompanies() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background mt-8">
      <p className="text-title text-4xl font-bold w-[643px] mx-auto text-center">
        Empresas que confían en nuestra orientación psicológica
      </p>
      <div className="flex flex-wrap justify-center gap-24 mt-16 mb-28">
        {enterprises.map((company, index) => (
          <div key={index}>
              <Image
                src={company.icon}
                alt={company.alt}
                width={company.width}
                height={company.height}
                style={{ width: 'auto', height: 'auto', maxHeight: '80px' }}
                className="object-contain"
              />
          </div>
        ))}
      </div>
    </div>
  );
}
