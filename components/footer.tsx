"use client";

import RedesSociales from "@/components/RedesSociales";
import { Image } from "@heroui/react";
import { motion } from "framer-motion";

import Link from "next/link";

export default function Footer() {
  const leftLinks = [
    { text: "Inicio", href: "/" },
    { text: "Sobre Nosotros", href: "/sobreNosotros" },
    { text: "Servicios", href: "/servicios/terapia/infantes" },
    { text: "Contáctanos", href: "/contactanos" },
  ];

  const rightLinks = [
    { text: "Preguntas Frecuentes", href: "/PreguntasFrecuentes" },
    { text: "Blog", href: "/blog" },
    { text: "Iniciar sesión", href: "/login" },
    { text: "Reservar cita", href: "/ReservarCita" },
  ];

  return (
    <footer className="bg-[#634AE2] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contenido Principal */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-12 md:space-y-0">
          {/* Logo */}
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

          {/* Sección de Enlaces */}
          <div className="w-full md:w-auto  flex flex-col text-center md:text-left items-center md:items-start">
            <h3 className="text-xl font-semibold mb-2">Enlaces</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Columna izquierda */}
              <ul className="space-y-3">
                {leftLinks.map((link) => (
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

              {/* Columna derecha */}
              <ul className="space-y-3">
                {rightLinks.map((link) => (
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
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col items-center text-center md:text-left justify-start w-full md:w-auto md:items-start">
            <h3 className="text-xl font-semibold text-white mb-4">Síguenos</h3>
            <div className="flex justify-start space-x-6">
              <RedesSociales />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
