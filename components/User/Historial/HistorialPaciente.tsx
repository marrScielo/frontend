import React, { useEffect, useState } from "react";
import { Icons } from "@/icons";
import DetallesPaciente from "./DetallesPaciente";
import { DatePacienteProps, ListaCitas } from "@/interface";
import { parseCookies } from "nookies";

const headerColumns = [
  { uid: 1, name: "#" },
  { uid: 2, name: "Paciente" },
  { uid: 3, name: "Fecha de Inicio" },
  { uid: 4, name: "Diagnóstico" },
  { uid: 5, name: "Detalles" },
  { uid: 6, name: "Editar" },
];

export const HistorialPaciente: React.FC<DatePacienteProps> = ({
  pacienteId,
}) => {
  const [showCart, setShowCart] = useState(false);
  const [atenciones, setAtenciones] = useState<ListaCitas[]>([]);
  // Traer todas las atenciones del paciente
  const handleGetAtenciones = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/atenciones/paciente/${pacienteId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.result) {
        const atenciones = Array.isArray(data.result) ? data.result.flat() : [];
        setAtenciones(atenciones);
      }
    } catch (error) {
      console.error("Error al obtener atenciones:", error);
    }
  };

  useEffect(() => {
    handleGetAtenciones();
  }, [pacienteId]);

  return (
    <div className="relative overflow-auto rounded-lg pt-2 text-[#634AE2] bg-[#fff]">
      <div className="text-3xl pb-3 font-bold">Historial de atención</div>
      <table className="w-full border-separate border-spacing-y-3 max-h-[585px]">
        {/* Encabezado de la tabla */}
        <thead className="sticky bg-[#6364F4]">
          <tr>
            {headerColumns.map((column, index) => (
              <th
                key={column.uid}
                className={`text-[#fff] font-normal text-lg text-center p-3 ${
                  index === 0
                    ? "rounded-tl-full"
                    : index === headerColumns.length - 1
                    ? "rounded-tr-full"
                    : ""
                }`}
              >
                {column.name}
              </th>
            ))}
          </tr>
        </thead>

        {/* Cuerpo de la tabla */}
        <tbody>
          {atenciones.map((atenciones) => (
            <tr key={atenciones.idAtencion} className="bg-[#E7E7FF]">
              <td className="font-normal text-lg text-center p-6 rounded-l-medium">
                {atenciones.idAtencion}
              </td>
              <td className="font-normal text-lg text-center p-6">
                {atenciones.nombre_completo}
              </td>
              <td className="font-normal text-lg text-center p-6">
                {atenciones.fecha}
              </td>
              <td className="font-normal text-lg text-center p-6">
                {atenciones.diagnostico}
              </td>
              <td className="font-normal text-lg justify-items-center p-6">
                <button
                  className="rounded-full border-2 border-[#634AE2] w-28 items-center justify-center flex space-x-1"
                  onClick={() => setShowCart(true)}
                >
                  <span
                    dangerouslySetInnerHTML={{
                      __html: Icons.eye.replace(
                        /<svg /,
                        '<svg fill="#634AE2" '
                      ),
                    }}
                    style={{
                      width: "1.2em",
                      height: "1.2em",
                    }}
                  />
                  Ver mas
                </button>
              </td>
              <td className="font-normal text-lg text-center p-6 rounded-r-medium">
                <button
                  dangerouslySetInnerHTML={{
                    __html: Icons.edit.replace(/<svg /, '<svg fill="#634AE2" '),
                  }}
                  style={{
                    width: "1.2em",
                    height: "1.2em",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showCart && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20"
          onClick={() => setShowCart(false)}
        >
          <div
            className="relative bg-white p-6 rounded-3xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <DetallesPaciente />
          </div>
        </div>
      )}
    </div>
  );
};
