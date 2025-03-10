"use client";
import React, { useEffect, useState} from "react";
import { ThemeToggle } from "@/components/Themetoggle";
import Link from "next/link";

import { DateRangePicker } from "@heroui/react";
import DashboardComponents from "@/components/User/Dashboard/DashboardComponents";
import { UsuarioLocalStorage } from "@/interface";

const navItems = [
  {
    name: "General",
    comp: "/user/home",
  },
  {
    name: "Clientes",
    comp: "/user/home",
  },
  {
    name: "Citas",
    comp: "/user/home",
  },
  {
    name: "Ventas",
    comp: "/user/home",
  },
  {
    name: "Rendimiento",
    comp: "/user/home",
  },
];



const PageHome = () => {
  const [user, setUser] = useState<UsuarioLocalStorage|null>(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as UsuarioLocalStorage);
      }
    }
  }, []);

  if (!user) {
    return <div>Loading..</div>; 
  }
  
  return (
    <div className="pb-8 bg-[#eaeded]">
      {/* Header */}
      <div className="flex flex-1 bg-[#eaeded] w-full z-30 mt-4">
        <div>
          <nav className="bg-[#eaeded] rounded-2xl mt-3 h-[12vh] flex items-center w-[calc(95vw-270px)] p-4">
            <div className="bg-[#eaeded] flex items-start justify-between w-full">
              <div>
                <div className="text-4xl font-bold text-[#634AE2]">
                  <h1>Buenos días, {user.nombre} {user.apellido}</h1>
                </div>
                <div className="text-0xl font-normal text-[#634AE2] pt-1">
                  Prepárate para un gran día.
                </div>
                <div className="text-0xl font-bold text-[#634AE2]">
                  Tienes x citas programadas para hoy
                </div>
                <div className="text-0xl font-normal text-[#634AE2]">
                  Aprovecha para planificar tus próximos objetivos.
                </div>
              </div>
              <div className="flex gap-x-5 mt-2">
                <ThemeToggle />
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Navbar */}
      <div>
        <div className="flex w-full mt-8 ">
          <div className="bg-[#6364F4] w-full h-[8vh] flex flex-row justify-start items-center px-4">
            <div className="flex flex-row gap-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.comp}
                  className="text-xl font-normal ml-4 text-white transition-colors duration-300 hover:text-[#6364F4] hover:bg-[#fff] rounded-2xl pl-6 pr-6 pt-1 pb-1"
                >
                  {item.name}
                </Link>
              ))}
              <div className="w-full max-w-xl flex flex-row gap-4 ">
                <DateRangePicker
                  showMonthAndYearPickers
                  selectorButtonPlacement="start"
                  aria-label="Example static collection table"
                  aria-labelledby="label-id"
                  classNames={{
                    inputWrapper: "bg-[#E7E7FF] rounded-full ",
                    segment: "!text-[#634AE2]",
                  }}
                  calendarProps={{
                    classNames: {
                      pickerMonthList: "bg-[#E7E7FF]",
                      pickerYearList: "bg-[#E7E7FF]",
                      pickerItem: "!text-[#634AE2]",
                      base: "bg-background text-[#634AE2]",
                      headerWrapper: "pt-4 bg-[#E7E7FF] text-[#634AE2]",
                      prevButton:
                        "border-1 border-default-200 rounded-small bg-[#E7E7FF] text-xl text-[#634AE2]",
                      nextButton:
                        "border-1 border-default-200 rounded-small bg-[#E7E7FF] text-xl text-[#634AE2]",
                      gridHeader:
                        "bg-background shadow-none border-b-1 border-default-100 bg-[#E7E7FF] text-[#634AE2]",
                      cellButton: [
                        "data-[today=true]:bg-[#E7E7FF] data-[selected=true] text-[#634AE2]:bg-[#E7E7FF] rounded-full text-[#634AE2]",
                        "data-[selected=true]:!bg-[#E7E7FF] data-[selected=true]:!text-[#634AE2] rounded-full",
                        "data-[range-start=true]:before:rounded-l-small font-bold text-[#634AE2] ",
                        "data-[selection-start=true]:before:rounded-l-small font-bold text-[#634AE2]",
                        "data-[range-end=true]:before:rounded-r-small font-bold text-[#634AE2]",
                        "data-[selection-end=true]:before:rounded-r-small font-bold text-[#634AE2] ",
                        "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small font-bold text-[#634AE2]",
                        "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small font-bold text-[#634AE2]",
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DashboardComponents />
    </div>
  );
};

export default PageHome;
