"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Navbar } from "@/components/User/Historial/SearchNavbar";
import { TableComponent } from "@/components/User/Historial/TableComponent";
import CerrarSesion from "@/components/CerrarSesion";
import { Citas, Paciente } from "@/interface";
import { parseCookies } from "nookies";
import showToast from "@/components/ToastStyle";

const columns = [
  { name: "Codigo", uid: "id", sortable: true },
  { name: "Paciente", uid: "name", sortable: true },
  { name: "Fecha de Cita", uid: "fecha", sortable: true },
  { name: "Diagnostico", uid: "motivo", sortable: true },
  { name: "Estado", uid: "status", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = ["id", "name", "fecha", "motivo", "status"];

interface CombinedData {
  id: string;
  name: string;
  fecha: string;
  status: string;
  age?: string;
  motivo: string;
}

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [citas, setCitas] = useState<Citas[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "fecha",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  // Función para combinar datos de pacientes y citas
  const combineData = useCallback((pacientes: Paciente[], citas: Citas[]) => {
    return citas.map(cita => {
      const paciente = pacientes.find(p => p.id === cita.paciente_id);
      return {
        id: paciente?.idPaciente || '',
        name: paciente ? `${paciente.nombre} ${paciente.apellido}` : 'Paciente no encontrado',
        fecha: cita.fecha_inicio || '',
        status: cita.estado || '',
        age: paciente ? '' : '',
        motivo: cita.motivo || ''
      };
    });
  }, []);

  useEffect(() => {
    if (pacientes.length > 0 && citas.length > 0) {
      setCombinedData(combineData(pacientes, citas));
    }
  }, [pacientes, citas, combineData]);

  const filteredItems = useMemo(() => {
    let filteredData = [...combinedData];
    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredData;
  }, [combinedData, filterValue]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as string;
      const second = b[sortDescriptor.column as keyof typeof b] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = useCallback((user: CombinedData, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof typeof user];
    switch (columnKey) {
      case "name":
        return user.name;
      case "fecha":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            {user.age && <p className="text-bold text-small capitalize">Edad: {user.age}</p>}
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
      column: "fecha",
      direction:
        sortDescriptor.column === "fecha" &&
        sortDescriptor.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };
  
  const handleSortByName = () => {
    setSortDescriptor({
      column: "name",
      direction:
        sortDescriptor.column === "name" &&
        sortDescriptor.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  // Funcion para traer a todos los pacientes
  const handleGetPacientes = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/pacientes`;
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
          setPacientes(data.result);
        } else {
          console.error("La propiedad 'result' no es un array:", data);
          showToast("error", "Formato de respuesta inválido");
          setPacientes([]);
        }
      } else {
        showToast("error", data.message || "Error al obtener los pacientes");
        setPacientes([]);
      }
    } catch (error) {
      console.error(error);
      showToast("error", "Error de conexión. Intenta nuevamente.");
      setPacientes([]);
    }
  };

  // Funcion para traer todas las citas
  const handleGetCitas = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies["session"];
      const url = `${process.env.NEXT_PUBLIC_API_URL}api/citas/showAll`;
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
    handleGetPacientes();
    handleGetCitas();
  }, []);

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
          users={sortedItems}
          headerColumns={headerColumns}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}