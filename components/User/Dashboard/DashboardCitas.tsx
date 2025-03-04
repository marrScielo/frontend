"use client";
import React from "react";
import { Icons } from "@/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/react";

const cita = [
  { id: 1, hora: "08:00", descripcion: "No hay cita programada" },
  { id: 2, hora: "09:00", descripcion: "No hay cita programada" },
  { id: 3, hora: "10:00", descripcion: "No hay cita programada" },
  { id: 4, hora: "11:00", descripcion: "No hay cita programada" },
  { id: 5, hora: "12:00", descripcion: "No hay cita programada" },
  { id: 6, hora: "13:00", descripcion: "No hay cita programada" },
  { id: 7, hora: "14:00", descripcion: "No hay cita programada" },
  { id: 8, hora: "15:00", descripcion: "No hay cita programada" },
  { id: 9, hora: "16:00", descripcion: "No hay cita programada" },
  { id: 10, hora: "17:00", descripcion: "No hay cita programada" },
  { id: 11, hora: "18:00", descripcion: "No hay cita programada" },
];

const columns = [
  { key: "hora", label: "Hora" },
  { key: "descripcion", label: "Descripción" },
];

export default function DashboardCitas() {
  return (
    <div className="bg-[#fff] w-3/4 pt-8 rounded-2xl">
      <div className="flex rounded-r-full py-5 text-[#fff] bg-[#6364F4] justify-center font-normal text-2xl w-4/6">
        Citas del dia
        <button
          className="ml-4 -mt-2 group cursor-pointer outline-none hover:rotate-90 duration-300"
          dangerouslySetInnerHTML={{ __html: Icons.loup }}
        />
      </div>
      <div className="flex rounded-r-full pl-8 py-2 mt-4 text-[#634AE2] bg-[#E7E7FF] justify-start font-bold text-lg w-4/12">
        Fecha:
        <span className="ml-4 justify-start font-light text-[#634AE2] text-lg">
          Feb,15
        </span>
      </div>

      <div className="flex rounded-r-full pl-8 py-2 mt-3 text-[#634AE2] bg-[#E7E7FF] justify-start font-bold text-lg w-4/12">
        Hora:
      </div>
      <div className="h-[368px] overflow-y-auto scrollbar-thin">
        <Table
          isStriped
          isVirtualized
          aria-label="Example static collection table"
          hideHeader
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={cita}>
            {(item) => (
              <TableRow key={item.id} className="text-[#634AE2]">
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`
                      ${
                        column.key === "hora"
                          ? "pl-16 font-light text-xl text-[#634AE2]"
                          : ""
                      }
                      ${
                        column.key === "descripcion"
                          ? "font-light text-lg text-[#BABAFF]"
                          : ""
                      }
                    `}
                  >
                    {item[column.key as keyof typeof item]}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
