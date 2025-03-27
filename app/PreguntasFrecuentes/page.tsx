import AccordionQuest from "@/components/AccordionQuest";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes - ContigoVoy",
  description: "Preguntas Frecuentes sobre terapia psicológica",
};

export default function App() {
  const faqs = [
    {
      Question: "¿Cuánto va a costar mi terapia?",
      Answer:
        "El costo de las terapias varía según el tipo de terapia que el paciente busque. Los precios varían entre 69 y 129 soles por sesión.",
    },
    {
      Question: "¿Cuánto es el tiempo de duración de la consulta?",
      Answer:
        "Cada persona es única, por lo que no podemos estimar el tiempo ni el costo sin la consulta. Allí, el especialista brindará un diagnóstico preciso y personalizará tu terapia para garantizar los mejores resultados.",
    },
    {
      Question: "¿Cuáles son los métodos de pago?",
      Answer:
        "Para facilitar el proceso, ofrecemos diversas formas de pago como transferencia bancaria, Yape o Plin.",
    },
    {
      Question: "¿Qué tipos de terapia manejan los psicólogos?",
      Answer:
        "Nuestros especialistas están altamente capacitados en terapia cognitivo-conductual, uno de los enfoques más efectivos y respaldados científicamente en la actualidad para el tratamiento de diversas condiciones psicológicas.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-no-repeat lg:bg-bottom  bg-bottom background_faq"
      style={{
        backgroundImage: `linear-gradient(#634AE27A, #634AE27A), url('/preguntas-sobre-terapia-en-linea.webp')`,
      }}
    >
      <div className="lg:text-left md:text-left font-bold lg:text-5xl text-2xl pt-[60px] pb-[70px] text-white lg:pl-20 text-center md:pl-20">
        Preguntas frecuentes
      </div>
      <div className="grid gap-4 pb-28 max-w-full sm:max-w-[150px] md:max-w-2xl pl-5 sm:pl-10 md:pl-20">
        <AccordionQuest faqs={faqs} />
      </div>
    </div>
  );
}
