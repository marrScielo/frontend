
import { Icons } from "@/icons";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";


interface NavbarProps {
  filterValue: string;
  onSearchChange: (value?: string) => void;
  onClear: () => void;
  visibleColumns: Set<string>;
  setVisibleColumns: (columns: Set<string>) => void;
  columns: { name: string; uid: string; sortable?: boolean }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  filterValue,
  onSearchChange,
  onClear,
}) => {
  return (
    <div className="flex w-full mt-8 z-40">
      <div className="bg-[#6364F4] w-full h-[8vh] flex flex-row justify-start items-center px-4">
        <div className="flex flex-row gap-4 w-full items-center pl-12">
          {/* Icono de filtro */}
          <span
            className="text-[#634AE2] transition-colors"
            dangerouslySetInnerHTML={{
              __html: Icons.filter.replace(/<svg /, '<svg fill="#fff" '),
            }}
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
          />
          <Dropdown
            classNames={{
              base: "bg-none",
            }}
          >
            <DropdownTrigger className="text-[#fff] font-light text-xl">
              <Button variant="bordered" className="border-none">
                Filtrar{" "}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Ordenar por">
              <DropdownItem
                key="genero"
                classNames={{
                  base: "rounded-2x1 text-base font-normal h-6 text-[#634AE2] data-[hover=true]:bg-[#9494F3] data-[hover=true]:text-white",
                  title: "ml-3 text-[16px]",
                }}
              >
                Genero
                <span
                  className="inline-flex items-center ml-[127px]"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="#634AE2"'
                    ),
                  }}
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    transform: "rotate(-90deg)",
                  }}
                />
              </DropdownItem>
              <DropdownItem
                key="edad"
                classNames={{
                  base: "rounded-2x1 text-base font-normal h-6 text-[#634AE2] data-[hover=true]:bg-[#9494F3] data-[hover=true]:text-white",
                  title: "ml-3 text-[16px]",
                }}
              >
                Edad{" "}
                <span
                  className="inline-flex items-center ml-[139px]"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="#634AE2" '
                    ),
                  }}
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    transform: "rotate(-90deg)",
                  }}
                />
              </DropdownItem>
              <DropdownItem
                key="FechaCreacion"
                classNames={{
                  base: "rounded-2x1 text-base font-normal h-6 text-[#634AE2] data-[hover=true]:bg-[#9494F3] data-[hover=true]:text-white",
                  title: "ml-3 text-[16px]",
                }}
              >
                Fecha de creacion{" "}
                <span
                  className="inline-flex items-center ml-[37px]"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="#634AE2" '
                    ),
                  }}
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    transform: "rotate(-90deg)",
                  }}
                />
              </DropdownItem>
              <DropdownItem
                key="FechaUltimaCita"
                classNames={{
                  base: "rounded-2x1 text-base font-normal h-6 text-[#634AE2] data-[hover=true]:bg-[#9494F3] data-[hover=true]:text-white",
                  title: " ml-3 text-[16px]",
                }}
              >
                Fecha de Ultima Cita{" "}
                <span
                  className="inline-flex items-center ml-[18px]"
                  dangerouslySetInnerHTML={{
                    __html: Icons.arrow.replace(
                      /<svg /,
                      '<svg fill="#634AE2" '
                    ),
                  }}
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    transform: "rotate(-90deg)",
                  }}
                />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Icono de lupa */}
          <span
            className="text-[#fff] transition-colors pl-6"
            dangerouslySetInnerHTML={{
              __html: Icons.loup.replace(/<svg /, '<svg fill="currentColor" '),
            }}
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
          />

          {/* Input de búsqueda */}
          <Input
            type="text"
            placeholder="Buscar paciente"
            isClearable
            size="sm"
            radius="full"
            variant="bordered"
            className="rounded-full bg-[#EAEAFF] ml-4 w-48"
            classNames={{
              input: "placeholder:text-[#9494F3]",
            }}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />

          {/* Grupo de icono de agregar y botón */}
          <div className="ml-auto flex items-center gap-4 mr-12">
            {/* Icono de agregar */}
            <span
              className="text-[#634AE2] transition-colors"
              dangerouslySetInnerHTML={{
                __html: Icons.plus.replace(/<svg /, '<svg fill="#634AE2"'),
              }}
              style={{
                background: "#fff",
                borderRadius: "9999px",
                borderColor: "#634AE2",
              }}
            />

            {/* Botón de agregar nueva cita */}
            <button className="text-[#fff] font-light text-xl border-1 rounded-full px-4">
              Agregar nueva cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
