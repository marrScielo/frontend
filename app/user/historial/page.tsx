"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Navbar } from "@/components/User/Historial/SearchNavbar";
import { TableComponent } from "@/components/User/Historial/TableComponent";
import CerrarSesion from "@/components/CerrarSesion";
import { Citas } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "@/components/ToastStyle";

const columns = [
  { name: "Código", uid: "codigo", sortable: true },
  { name: "Paciente", uid: "paciente", sortable: true },
  { name: "Fecha de Cita", uid: "fecha_inicio", sortable: true },
  { name: "Diagnóstico", uid: "motivo", sortable: true },
  { name: "Estado", uid: "estado", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["codigo", "paciente", "fecha_inicio", "motivo", "estado"];

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [citas, setCitas] = useState<Citas[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fecha_inicio",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...citas];
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        item.paciente.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredData;
  }, [citas, filterValue]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as string;
      const second = b[sortDescriptor.column as keyof typeof b] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = useCallback((cita: Citas, columnKey: React.Key) => {
    const cellValue = cita[columnKey as keyof typeof cita];
    
    switch (columnKey) {
      case "paciente":
        return cita.paciente;
      case "fecha_inicio":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {cita.age && <p className="text-bold text-small capitalize">Edad: {cita.age}</p>}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
  }, []);

  const handleSortByDate = () => {
    setSortDescriptor({
      column: "fecha_inicio",
      direction:
        sortDescriptor.column === "fecha_inicio" &&
        sortDescriptor.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };
  
  const handleSortByName = () => {
    setSortDescriptor({
      column: "paciente",
      direction:
        sortDescriptor.column === "paciente" &&
        sortDescriptor.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  const handleGetCitas = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/citas`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data.result)) {
          setCitas(data.result);
        } else {
          console.error("La propiedad 'result' no es un array:", data);
          showToast("error", "Formato de respuesta inválido");
          setCitas([]);
        }
      } else {
        showToast("error", data.message || "Error al obtener las citas");
        setCitas([]);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error de conexión. Intenta nuevamente.");
      setCitas([]);
    }
  };

  useEffect(() => {
    handleGetCitas();
  },  [handleGetCitas]);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div>
                <div className="pl-12 text-4xl font-bold text-[#634AE2]">
                  <h1>Historial de pacientes</h1>
                </div>
              </div>
              <div className="flex gap-x-5 mt-2">
                <CerrarSesion />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div>
        <Navbar
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          onClear={onClear}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
          onSortByDate={handleSortByDate}
          onSortByName={handleSortByName}
        />
        <TableComponent
          citas={sortedItems}
          headerColumns={headerColumns}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}