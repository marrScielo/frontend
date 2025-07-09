"use client";
import { Icons } from "@/icons";
import { useEffect, useState, useCallback } from "react";
import React from "react";
import { Citas } from "@/interface";
import Link from "next/link";
import showToast from "@/components/ToastStyle";
import { parseCookies } from "nookies";

interface TableProps {
  users: Citas[];
  headerColumns: { name: string; uid: string; sortable?: boolean }[];
  selectedKeys: Set<React.Key>;
  setSelectedKeys: (keys: Set<React.Key>) => void;
  onCitaDeleted?: (idCita: number) => void;
  onEstadoChanged?: (idCita: number, nuevoEstado: string) => void;
  onDataRefresh?: () => void; // Nueva prop para recargar datos
}

export const TableCitas: React.FC<TableProps> = ({
  users,
  headerColumns,
  selectedKeys,
  setSelectedKeys,
  onCitaDeleted,
  onEstadoChanged,
  onDataRefresh,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  //Funcion para eliminar Citas
  const HandleDeleteCitas = async (idCita: number) => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/citas/${idCita}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        showToast("success", "Cita eliminada correctamente");
        if (onCitaDeleted) {
          onCitaDeleted(idCita);
        }
        // Recargar datos después de eliminar
        if (onDataRefresh) {
          onDataRefresh();
        }
      } else {
        showToast(
          "error",
          data.status_message || "Error de conexión. Intenta nuevamente"
        );
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error de conexión. Intenta nuevamente");
    }
  };

  // Función para cambiar el estado de la cita
  const handleEstadoChange = async (idCita: number, nuevoEstado: string) => {
    // Activar estado de carga para esta cita específica
    setLoadingStates(prev => ({ ...prev, [idCita]: true }));
    
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/citas/${idCita}/estado`;
      
      const response = await fetch(url, {
        method: "PATCH", // o PUT dependiendo de tu API
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      
      const data = await response.json();

      if (response.ok) {
        showToast("success", "Estado actualizado correctamente");
        if (onEstadoChanged) {
          onEstadoChanged(idCita, nuevoEstado);
        }
        // Recargar los datos para reflejar el cambio
        if (onDataRefresh) {
          onDataRefresh();
        }
      } else {
        showToast(
          "error",
          data.status_message || "Error al actualizar el estado"
        );
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error de conexión. Intenta nuevamente");
    } finally {
      // Desactivar estado de carga
      setLoadingStates(prev => ({ ...prev, [idCita]: false }));
    }
  };

  const handleSelectAll = useCallback(() => {
    if (selectedKeys.size === users.length) {
      setSelectedKeys(new Set());
    } else {
      const allKeys = new Set(users.map((user) => user.codigo));
      setSelectedKeys(allKeys);
    }
  }, [selectedKeys, users, setSelectedKeys]);

  const handleSelectItem = useCallback(
    (id: string) => {
      const newSelectedKeys = new Set(selectedKeys);
      if (newSelectedKeys.has(id)) {
        newSelectedKeys.delete(id);
      } else {
        newSelectedKeys.add(id);
      }
      setSelectedKeys(newSelectedKeys);
    },
    [selectedKeys, setSelectedKeys]
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Confirmada":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300";
      case "Pendiente":
        return "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-300";
      case "Cancelada":
        return "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-300";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300";
    }
  };

  const renderCell = useCallback(
    (user: Citas, columnKey: keyof Citas | "actions") => {
      if (columnKey === "actions") {
        return (
          <div className="pl-6 flex gap-4">
            <button
              onClick={() => {
                if (confirm("¿Estás seguro de eliminar esta cita?")) {
                  HandleDeleteCitas(Number(user.idCita));
                }
              }}
              className="flex flex-col items-center pt-1 group"
            >
              <div className="relative">
                <span
                  className="text-lg text-[#B158FF] cursor-pointer active:opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:text-[#9d47e6]"
                  dangerouslySetInnerHTML={{ __html: Icons.delete }}
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-red-500 text-white text-xs p-2 rounded-lg transition-all duration-300 whitespace-nowrap shadow-lg">
                  Eliminar cita
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-500"></div>
                </div>
              </div>
              <span className="text-xs text-[#B158FF] mt-2 group-hover:text-[#9d47e6] transition-colors duration-300">Eliminar</span>
            </button>

            <div className="flex flex-col items-center pt-1">
              <Link
                href={{
                  pathname: `/user/historial/AtencionPaciente/${user.idCita}`,
                }}
                className="relative group"
                passHref
              >
                <span
                  className="text-lg text-[#3df356] cursor-pointer active:opacity-50 transition-all duration-300 group-hover:scale-110 group-hover:text-[#2ee847]"
                  dangerouslySetInnerHTML={{ __html: Icons.hand }}
                  style={{ width: "1.2em", height: "1.2em", fill: "#3df356" }}
                />
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-lime-500 text-white text-xs p-2 rounded-lg transition-all duration-300 whitespace-nowrap shadow-lg">
                  Agregar Atención
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-lime-500"></div>
                </div>
                <span className="text-xs text-[#3df356] mt-2 group-hover:text-[#2ee847] transition-colors duration-300">Atención</span>
              </Link>
            </div>
          </div>
        );
      }

      const cellValue = user[columnKey];

      switch (columnKey) {
        case "paciente":
          return (
            <div className="flex flex-col">
              <span className="font-medium">{cellValue}</span>
            </div>
          );
        case "codigo":
          return (
            <div className="flex flex-col">
              <span className="font-medium">{cellValue}</span>
            </div>
          );
        case "estado":
          const isLoading = loadingStates[Number(user.idCita)];
          return (
            <div className="relative">
              <select
                value={cellValue}
                onChange={(e) => handleEstadoChange(Number(user.idCita), e.target.value)}
                disabled={isLoading}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium border-2 cursor-pointer
                  transition-all duration-300 ease-in-out
                  hover:scale-105 hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                  appearance-none bg-right bg-no-repeat
                  ${getEstadoColor(cellValue)}
                  hover:brightness-110 active:scale-95
                  ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmada">Confirmada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
              
              {/* Indicador de estado con animación */}
              <div className={`
                absolute -top-1 -right-1 w-3 h-3 rounded-full
                transition-all duration-300 ease-in-out
                ${isLoading ? 'bg-blue-500' : 
                  cellValue === 'Confirmada' ? 'bg-green-500 animate-pulse' : 
                  cellValue === 'Pendiente' ? 'bg-yellow-500 animate-pulse' : 
                  'bg-red-500 animate-pulse'}
              `}>
                {isLoading && (
                  <div className="w-full h-full border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
              </div>
            </div>
          );
        case "fecha_inicio":
          return new Date(cellValue).toLocaleString();
        default:
          return cellValue;
      }
    },
    [loadingStates]
  );

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="overflow-x-auto max-h-[585px] p-5 w-full mx-auto">
        <table className="w-full text-[#634AE2] border-separate border-spacing-y-2">
          <thead className="sticky top-0 bg-[#6364F4] text-[#fff]">
            <tr>
              <th className="p-4 text-center rounded-tl-full">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-full border-[#634AE2] bg-white focus:ring-0 checked:bg-[#634AE2] appearance-none"
                  checked={
                    selectedKeys.size === users.length && users.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              {headerColumns.map((column, index) => (
                <th
                  key={column.uid}
                  className={`p-4 text-lg font-normal text-center ${
                    index === headerColumns.length - 1 ? "" : ""
                  }`}
                >
                  {column.name}
                </th>
              ))}
              <th className="p-4 text-center rounded-tr-full">
                <div className="text-lg font-normal text-center">Más</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr
                key={item.fecha_inicio}
                className="border-y-4 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <td className="p-4 text-center rounded-l-3xl">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-full border-[#634AE2] border-3 bg-white focus:ring-0 checked:bg-[#634AE2] appearance-none"
                    checked={selectedKeys.has(item.codigo)}
                    onChange={() => handleSelectItem(item.codigo)}
                  />
                </td>

                {headerColumns.map((column, index) => (
                  <td
                    key={column.uid}
                    className={`p-4 text-lg text-center ${
                      index === headerColumns.length - 1 ? "" : ""
                    }`}
                  >
                    {renderCell(item, column.uid as keyof Citas)}
                  </td>
                ))}
                <td className="p-4 text-center rounded-r-3xl">
                  {renderCell(item, "actions")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};