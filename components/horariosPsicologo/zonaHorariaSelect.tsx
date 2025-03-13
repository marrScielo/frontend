import React from "react";

const zonasHorarias = [
  { nombre: "Perú", zona: "America/Lima" },
  { nombre: "Argentina", zona: "America/Buenos_Aires" },
  { nombre: "Bolivia", zona: "America/La_Paz" },
  { nombre: "Chile", zona: "America/Santiago" },
  { nombre: "Colombia", zona: "America/Bogota" },
  { nombre: "Costa Rica", zona: "America/Costa_Rica" },
  { nombre: "Ecuador", zona: "America/Guayaquil" },
  { nombre: "México (CDMX)", zona: "America/Mexico_City" },
  { nombre: "Paraguay", zona: "America/Asuncion" },
  { nombre: "Uruguay", zona: "America/Montevideo" },
  { nombre: "Venezuela", zona: "America/Caracas" },
  { nombre: "España (Península)", zona: "Europe/Madrid" },
  { nombre: "España (Islas Canarias)", zona: "Atlantic/Canary" },
  { nombre: "EE.UU. - Este (Miami, NY)", zona: "America/New_York" },
  { nombre: "EE.UU. - Centro (Texas, Chicago)", zona: "America/Chicago" },
  { nombre: "EE.UU. - Montaña (Denver, NM)", zona: "America/Denver" },
  { nombre: "EE.UU. - Pacífico (California)", zona: "America/Los_Angeles" },
];

interface ZonaHorariaSelectProps {
  onChange: (zona: string) => void;
}

const ZonaHorariaSelect: React.FC<ZonaHorariaSelectProps> = ({ onChange }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="mt-3 p-2 rounded-full text-base bg-[#EAEAFF] text-[#634AE2]"
    >
      {zonasHorarias.map((z) => (
        <option key={z.zona} value={z.zona}>
          {z.zona}
        </option>
      ))}
    </select>
  );
};

export default ZonaHorariaSelect;
