import { Icons } from "@/icons";
import React from "react";

const redes = [
  {
    nombre: "tiktok",
    icono: Icons.tiktok,
    link: " https://www.tiktok.com/@contigovoy.pe",
  },
  {
    nombre: "threads",
    icono: Icons.threads,
    link: "https://www.threads.net/@centropsicologico_contigovoy?xmt=AQGzhgUl3zE052rR0Uo6GYSGAMvTqFrOObja-kBjKoMA7A",
  },
  {
    nombre: "instagram",
    icono: Icons.instagram,
    link: "https://www.instagram.com/centropsicologico_contigovoy?igsh=MjZjNDk5bXh6czcz",
  },
  {
    nombre: "facebook",
    icono: Icons.facebook,
    link: "https://www.facebook.com/contigovoy.pe",
  },
  {
    nombre: "youtube",
    icono: Icons.youtube,
    link: " https://youtube.com/@contigovoype?si=r47RqVuOdhpMDXoA",
  },
  
];

const RedesSociales = () => {
  return (
    <div>
      <ul className="wrapper">
        {redes.map((rede, index) => (
          <li
          className={`icon ${rede.nombre} w-5 fill-current text-[#634AE2]`}
            key={index}
            onClick={() => window.open(rede.link, "_blank")}
          >
            <span className="tooltip capitalize">{rede.nombre}</span>
            <div
              className="icon-svg"
              dangerouslySetInnerHTML={{ __html: rede.icono }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RedesSociales;
