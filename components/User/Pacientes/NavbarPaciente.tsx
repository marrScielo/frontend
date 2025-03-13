import React from "react";

const NavbarPaciente = () => {
  return (
    <div>
      <div className="flex w-full mt-4 pl-8 relative">
        <div
          className="flex items-center pr-[200px] pl-8 rounded-3xl z-50"
          style={{
            backgroundImage: `url(/Paciente.webp)`,
            backgroundPosition: "right top",
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 50, 
          }}
        ></div>
        <div className="bg-[#6364F4] w-full h-[8vh] flex flex-row items-center px-4 mt-10">
          <div className="flex flex-row gap-4">
            <div className="w-full max-w-xl flex flex-row gap-4 justify-between">
              <button className="text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#6364F4] px-4 py-2">
                Datos Personales
              </button>
              <button className="text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#6364F4] px-4 py-2">
                Historial Clinico
              </button>
              <button className="text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#6364F4] px-4 py-2">
                Citas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarPaciente;
