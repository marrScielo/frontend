"use client";
import React, { useState, useMemo, useCallback } from "react";
import { ThemeToggle } from "@/components/Themetoggle";
import { Navbar } from "@/components/User/Citas/NavbarCitas";
import { TableCitas } from "@/components/User/Citas/TableCitas";

const users = [
  {
    id: "PA001",
    name: "Tony Reichert",
    fecha: "2024-07-06 13:30",
    status: "Confirmado",
    age: "29",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA002",
    name: "Zoey Lang",
    fecha: "2024-07-06 13:30",
    status: "SinConfirmar",
    age: "25",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA003",
    name: "Jane Fisher",
    fecha: "2024-07-06 13:30",
    status: "Confirmado",
    age: "22",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA004",
    name: "William Howard",
    fecha: "2024-07-06 13:30",
    status: "SinConfirmar",
    age: "28",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA005",
    name: "Kristen Copper",
    fecha: "2024-07-06 13:30",
    status: "Confirmado",
    age: "24",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA006",
    name: "John Doe",
    fecha: "2024-07-06 14:00",
    status: "SinConfirmar",
    age: "30",
    motivo: "Estrés laboral",
  },
  {
    id: "PA007",
    name: "Maria Lopez",
    fecha: "2024-07-06 14:30",
    status: "Confirmado",
    age: "27",
    motivo: "Crisis emocional",
  },
  {
    id: "PA008",
    name: "Carlos Perez",
    fecha: "2024-07-06 15:00",
    status: "SinConfirmar",
    age: "32",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA009",
    name: "Sofia Martinez",
    fecha: "2024-07-06 15:30",
    status: "Confirmado",
    age: "25",
    motivo: "Estrés emocional",
  },
  {
    id: "PA010",
    name: "Lucas Silva",
    fecha: "2024-07-06 16:00",
    status: "SinConfirmar",
    age: "29",
    motivo: "Ataque de pánico",
  },
  {
    id: "PA011",
    name: "Ana Gonzalez",
    fecha: "2024-07-06 16:30",
    status: "Confirmado",
    age: "26",
    motivo: "Ansiedad generalizada",
  },
  {
    id: "PA012",
    name: "Diego Fernandez",
    fecha: "2024-07-06 17:00",
    status: "SinConfirmar",
    age: "33",
    motivo: "Crisis nerviosa",
  },
  {
    id: "PA013",
    name: "Laura Vega",
    fecha: "2024-07-06 17:30",
    status: "Confirmado",
    age: "24",
    motivo: "Estrés por trabajo",
  },
  {
    id: "PA014",
    name: "Tomás Reyes",
    fecha: "2024-07-06 18:00",
    status: "SinConfirmar",
    age: "31",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA015",
    name: "Mariana Castillo",
    fecha: "2024-07-06 18:30",
    status: "Confirmado",
    age: "28",
    motivo: "Crisis emocional",
  },
  {
    id: "PA016",
    name: "Diego Fernandez",
    fecha: "2024-07-06 17:00",
    status: "SinConfirmar",
    age: "33",
    motivo: "Crisis nerviosa",
  },
  {
    id: "PA017",
    name: "Laura Vega",
    fecha: "2024-07-06 17:30",
    status: "Confirmado",
    age: "24",
    motivo: "Estrés por trabajo",
  },
  {
    id: "PA018",
    name: "Tomás Reyes",
    fecha: "2024-07-06 18:00",
    status: "SinConfirmar",
    age: "31",
    motivo: "Ataque de ansiedad",
  },
  {
    id: "PA019",
    name: "Mariana Castillo",
    fecha: "2024-07-06 18:30",
    status: "Confirmado",
    age: "28",
    motivo: "Crisis emocional",
  },
];

const columns = [
  { name: "Paciente", uid: "name", sortable: true },
  { name: "Código", uid: "id", sortable: true },
  { name: "Motivo", uid: "motivo", sortable: true },
  { name: "Estado", uid: "status", sortable: true },
  { name: "Fecha de Inicio", uid: "fecha", sortable: true },
  { name: "Duración", uid: "age", sortable: true },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "name",
  "fecha",
  "motivo",
  "status",
  "age",
];

export default function App() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(new Set());
  const [visibleColumns, setVisibleColumns] = useState<Set<string>>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [sortDescriptor] = useState({
    column: "fecha",
    direction: "ascending",
  });
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [users, filterValue, hasSearchFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a] as string;
      const second = b[sortDescriptor.column as keyof typeof b] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const headerColumns = useMemo(() => {
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  },  [visibleColumns, columns]);

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

  return (
    <div>
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div>
                <div className="pl-12 text-4xl font-bold text-[#634AE2]">
                  <h1>Lista de Pacientes</h1>
                </div>
              </div>
              <div className="flex gap-x-5 mt-2">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div>
        {/* Navbar */}
        <Navbar
          filterValue={filterValue}
          onSearchChange={onSearchChange}
          onClear={onClear}
          visibleColumns={visibleColumns}
          setVisibleColumns={setVisibleColumns}
          columns={columns}
        />
        {/* Tabla */}
        <TableCitas
          users={sortedItems}
          headerColumns={headerColumns}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      </div>
    </div>
  );
}
