"use client";

import RedesSociales from "@/components/RedesSociales";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const footerSections = [
    {
      title: "Enlaces",
      links: [
        { text: "Inicio", href: "#" },
        { text: "Sobre Nosotros", href: "#" },
        { text: "Servicios", href: "servicios/terapia/infantes" },
        { text: "Contactanos", href: "contactanos" },
        { text: "Preguntas Frecuentes", href: "PreguntasFrecuentes" },
        { text: "Blog", href: "blog" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <footer className="bg-[#634AE2] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-12 md:space-y-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex-shrink-0"
          >
            <Image
              src="/LogoBlanco.webp"
              alt="Contigo Voy Logo"
              width={150}
              height={60}
            />
          </motion.div>

          {/* Footer Sections */}
          <div className="w-full md:w-auto ml-auto flex flex-col text-center md:text-left items-center justify-start md:items-start">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {footerSections.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * idx }}
                  className="relative"
                >
                  <h3 className="text-xl font-semibold mb-6">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links?.map((link) => (
                      <li key={link.text}>
                        <Link
                          href={link.href}
                          className="text-purple-100 hover:text-white transition-colors duration-500 text-sm flex items-center group relative"
                        >
                          <span className="relative group">
                            {link.text}
                            <span className="absolute bottom-0 left-0 w-0 transition-all h-0.5 bg-white group-hover:w-full inline-block duration-500"></span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Iconos de redes sociales */}
          <div className="flex flex-col items-center text-center md:text-left justify-start w-full md:w-auto md:items-start">
            <h3 className="text-xl font-semibold text-white mb-4">Síguenos</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-start space-x-6"
            >
              <motion.a>
                <RedesSociales />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
