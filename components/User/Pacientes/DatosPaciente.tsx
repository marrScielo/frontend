import React from "react";

const DatosPaciente = () => {
  return (
    <div>
      <div className="bg-background rounded-3xl p-4 flex justify-around mt-2 w-6/12 h-full">
        <div className="text-[#634AE2] font-bold flex flex-col gap-y-6">
          <div className="flex gap-6">
            <div className="w-28">Nombre</div>
            <div className="font-normal">Manuel </div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Apellido</div>
            <div className="font-normal">Pérez</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Genero</div>
            <div className="font-normal">Hombre</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Fecha de Nacimiento</div>
            <div className="font-normal">12 / 06 / 2000 (24 años)</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Ocupacion</div>
            <div className="font-normal">Ingeniero</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Estado Civil</div>
            <div className="font-normal">Soltero</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">DNI</div>
            <div className="font-normal">********</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Celular</div>
            <div className="font-normal">999-999-999</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Correo</div>
            <div className="font-normal">example@gmail.com</div>
          </div>
          <div className="flex gap-6">
            <div className="w-28">Direccion</div>
            <div className="font-normal">*********</div>
          </div>
        </div>
        <div>
          <button className="bg-transparent text-[#634AE2] border-[#634AE2] border-1 rounded-full py-2 px-4 mt-4">
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatosPaciente;
