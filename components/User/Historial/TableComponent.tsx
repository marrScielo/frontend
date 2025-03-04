"use client";
import React, { useEffect, useState } from "react";
import DatePaciente from "./DatePaciente";

interface User {
  id: string;
  name: string;
  fecha: string;
  status: string;
  age: string;
  motivo: string;
}

interface TableProps {
  users: User[];
  headerColumns: { name: string; uid: string; sortable?: boolean }[];
  renderCell: (user: User, columnKey: React.Key) => React.ReactNode;
}

export const TableComponent: React.FC<TableProps> = ({
  users,
  headerColumns,
  renderCell,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative max-h-[585px] overflow-auto rounded-lg pt-6 pl-8 pr-8 text-[#634AE2]">
      <table className="w-8/12 border-separate border-spacing-y-3">
        {/* Encabezado de la tabla */}
        <thead className="sticky top-0 bg-[#6364F4] overflow-hidden">
          <tr>
            {headerColumns.map((column, index) => (
              <th
                key={column.uid}
                className={`text-[#fff] font-normal text-lg text-center p-4 ${
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
          {users.length > 0 ? (
            users.map((item) => (
              <tr key={item.id} className="bg-[#fff] pt-8">
                {headerColumns.map((column, index) => (
                  <td
                    key={column.uid}
                    className={`font-normal text-lg text-center p-6 ${
                      index === 0 ? "rounded-l-3xl" : ""
                    } ${
                      index === headerColumns.length - 1 ? "rounded-r-3xl" : ""
                    }`}
                  >
                    {renderCell(item, column.uid)}
                  </td>
                ))}
                <td className="text-center bg-[#eaeded]">
                  <button
                    className="ml-2 text-[#fff] bg-[#634AE2] h-10 w-32 rounded-full font-normal text-x1"
                    onClick={() => setShowCart(true)}
                  >
                    Ver más
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headerColumns.length} className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Detalles del Paciente */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end pt-24 z-10 pr-28"
          onClick={() => setShowCart(false)}
        >
          <div
            className="relative bg-white p-6 rounded-3xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <DatePaciente />
          </div>
        </div>
      )}
    </div>
  );
};
