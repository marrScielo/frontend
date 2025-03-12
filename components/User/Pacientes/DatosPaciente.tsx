import React from "react";

const DatosPaciente = () => {
  return (
    <div>
      <div className="bg-background rounded-3xl p-4">
        <div className="text-[#634AE2] font-bold flex align">
          <div>
            <div>Nombre</div>
            <div className="font-normal">Manuel </div>
          </div>
          <div>
            <div>Apellido</div>
            <div className="font-normal">Pérez</div>
          </div>
          <div>
            <div>Genero</div>
            <div className="font-normal">Hombre</div>
          </div>
          <div>
            <div>Fecha de Nacimiento</div>
            <div className="font-normal">12 / 06 / 2000 (24 años)</div>
          </div>
          <div>
            <div>Ocupacion</div>
            <div className="font-normal">Ingeniero</div>
          </div>
          <div>
            <div>Estado Civil</div>
            <div className="font-normal">Soltero</div>
          </div>
          <div>
            <div>DNI</div>
            <div className="font-normal">********</div>
          </div>
          <div>
            <div>Celular</div>
            <div className="font-normal">999-999-999</div>
          </div>
          <div>
            <div>Correo</div>
            <div className="font-normal">example@gmail.com</div>
          </div>
          <div>
            <div>Direccion</div>
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
