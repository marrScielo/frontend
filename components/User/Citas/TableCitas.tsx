"use client";
import { Icons } from "@/icons";
import { useEffect, useState, useCallback } from "react";
import React from "react";

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
  selectedKeys: Set<React.Key>;
  setSelectedKeys: (keys: Set<React.Key>) => void;
}

export const TableCitas: React.FC<TableProps> = ({
  users,
  headerColumns,
  selectedKeys,
  setSelectedKeys,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedKeys.size === users.length) {
      setSelectedKeys(new Set());
    } else {
      const allKeys = new Set(users.map((user) => user.id));
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

  const renderCell = useCallback(
    (user: User, columnKey: keyof User | "actions") => {
      if (columnKey === "actions") {
        return (
          <div className="pl-6 flex gap-4">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <span
                  className="text-lg text-[#634AE2] cursor-pointer active:opacity-50"
                  dangerouslySetInnerHTML={{ __html: Icons.edit }}
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                <div className="absolute bottom-10 left-0 hidden group-hover:block bg-gray-700 text-white text-[10px] p-1 rounded z-20 ">
                  Editar paciente
                </div>
              </div>
              <span className="text-xs text-[#634AE2] mt-1">Editar</span>
            </div>

            <div className="flex flex-col items-center pt-1">
              <div className="relative group">
                <span
                  className="text-lg text-[#B158FF] cursor-pointer active:opacity-50"
                  dangerouslySetInnerHTML={{ __html: Icons.delete }}
                  style={{ width: "1.2em", height: "1.2em" }}
                />
                <div className="absolute bottom-10 left-0 hidden group-hover:block bg-red-500 text-white text-[10px] p-1 rounded z-20">
                  Eliminar paciente
                </div>
              </div>
              <span className="text-xs text-[#B158FF] mt-2">Eliminar</span>
            </div>
          </div>
        );
      }

      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return user.name;
        case "status":
          return <span>{cellValue}</span>;
        default:
          return cellValue;
      }
    },
    []
  );

  if (!isClient) {
    return null;
  }

  return (
    <div className="overflow-x-auto p-5 w-full mx-auto">
      <div className="relative h-[585px] overflow-y-auto">
        <table className="w-full text-[#634AE2] border-separate border-spacing-y-2">
          {/* Encabezado */}
          <thead className="sticky top-0 bg-[#6364F4] text-[#fff] z-20 ">
            <tr>
              <th className="p-4 text-center rounded-tl-full">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-full border-[#634AE2] bg-white focus:ring-0 checked:bg-[#634AE2] appearance-none"
                  checked={selectedKeys.size === users.length}
                  onChange={handleSelectAll}
                />
              </th>
              {headerColumns.map((column, index) => (
                <th
                  key={column.uid}
                  className={`p-4 text-lg font-normal text-center ${
                    index === headerColumns.length - 1
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
          
          
          
          {/* Cuerpo de la tabla */}
          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="border-y-4 bg-white hover:bg-gray-100">
                <td className="p-4 text-center rounded-l-3xl">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-full border-[#634AE2] border-3 bg-white focus:ring-0 checked:bg-[#634AE2] appearance-none"
                    checked={selectedKeys.has(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </td>
                {headerColumns.map((column, index) => (
                  <td
                    key={`${item.id}-${column.uid}`}
                    className={`p-4 text-lg text-center ${
                      index === headerColumns.length - 1
                    }`}
                  >
                    {renderCell(item, column.uid as keyof User)}
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
    </div>
  );
};