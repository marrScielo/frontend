"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ChooseUs() {
  const features = [
    {
      icon: (
        <Image
          src={"/ChooseUsImages/especialistas.webp"}
          alt="especialista"
          width={70}
          height={60}
          style={{ width: "auto", height: "auto" }} 
        />
      ),
      title: "Especialistas colegiados",
    },
    {
      icon: (
        <Image
          src="/ChooseUsImages/atencionvirtual.webp"
          alt="Atención virtual"
          width={70}
          height={60}
        />
      ),
      title: "Atención virtual",
    },
    {
      icon: (
        <Image
          src="/ChooseUsImages/etica.webp"
          alt="Ética y confiabilidad"
          width={70}
          height={60}
        />
      ),
      title: "Ética y confiabilidad",
    },
    {
      icon: (
        <Image
          src="/ChooseUsImages/horarios.webp"
          alt="Horarios flexibles"
          width={70}
          height={60}
        />
      ),
      title: "Horarios flexibles",
    },
    {
      icon: (
        <Image
          src="/ChooseUsImages/costos.webp"
          alt="Costos accesibles"
          width={70}
          height={60}
        />
      ),
      title: "Costos accesibles",
    },
    {
      icon: (
        <Image
          src="/ChooseUsImages/confidencialidad.webp"
          alt="Confidencialidad"
          width={70}
          height={60}
        />
      ),
      title: "Confidencialidad",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full  flex flex-col items-center justify-center pb-24 bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-[#634AE2] mb-5">
          ¿Por qué elegirnos?
        </h2>
        <p className=" text-[#634AE2] mb-5 w-[643px] mx-auto leading-relaxed ">
          En Contigo Voy, te ofrecemos atención psicológica online que se adapta
          a ti, brindándote el apoyo necesario para afrontar los desafíos
          diarios con mayor fortaleza y equilibrio emocional.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-40 justify-items-center"
      >
        {/* Primer fila con los primeros 4 elementos */}
        {features.slice(0, 4).map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="group"
          >
           <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full bg-[#634AE2] backdrop-blur-sm transition-all duration-300 cursor-pointer ">
                <div className="p-4 bg-[#634AE2] rounded-full group-hover:bg-[#9494F3] transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-center text-lg w-40 font-semibold text-[#634AE2]  mt-3 ">
                {feature.title}
              </h3>
          </motion.div>
        ))}

        <div className="lg:col-span-4 flex justify-center gap-40">
          {features.slice(4).map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="flex flex-col items-center justify-center w-40 h-40 rounded-full bg-[#634AE2] backdrop-blur-sm transition-all duration-300 cursor-pointer shadow-lg space-y-4">
                <div className="p-4 bg-[#634AE2] rounded-full group-hover:bg-[#9494F3] transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-center text-lg w-full font-semibold text-[#634AE2]  mt-3 ">
                {feature.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
