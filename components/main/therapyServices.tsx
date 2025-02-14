"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function TherapyServices() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const services = [
    {
      id:"/terapia/infantes",
      icon: "/images/childTherapy.webp",
      title: "Terapia para niños",
    },
    {
      id:"/terapia/adolescentes",
      icon: "/images/TeenTherapy.webp",
      title: "Terapia adolescente",
    },
    {
      id:"/terapia/parejas",
      icon: "/images/adultTherapy.webp",
      title: "Terapia de parejas",
    },
    {
      id:"/terapia/adultos",
      icon: "/images/coupleTherapy.webp",
      title: "Terapia para adultos",
    },
    {
      id:"/terapia/familia",
      icon: "/images/familyTherapy.webp",
      title: "Terapia familiar",
    },
  ];

  return (
    <div className="max-w-full px-0 mb-4 mx-auto py-16 ">
    <motion.h2
      className="text-4xl font-bold mt-[65px] text-center text-[#634AE2] mb-16 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Servicios
      </motion.h2>

      <div className="flex gap-[3px] md:flex-row flex-col">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex-1 bg-[#634AE2] p-3 text-white duration-400 flex flex-col 
            hover:flex-[1.2] hover:shadow-[0_7px_29px_0px_rgba(99,74,226,0.2)]
            md:w-auto w-full md:hover:flex-[1.2] "
          >
            <div className="flex flex-col items-end mb-[25px]">
              <Image
                src={service.icon}
                alt={service.title}
                width={63}
                height={63}
              />
            </div>
            <h3 className="mt-3 mb-[46px] text-xl font-bold">
              {service.title}
            </h3>
            <div className="flex flex-col items-end mt-auto mb-5">
              <button
                onClick={() => router.push(`/servicios${service.id}`)}
                className="group flex items-center space-x-2 text-sm hover:text-purple-200 transition-colors"
              >
                 <span className="relative group ">
                  Ver más
                  <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full duration-500"></span>
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

     
    </div>
  );
}

