import React, { useState } from "react";
import DetallesPaciente from "../Historial/DetallesPaciente";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  return (
    <div className="mt-2 w-[500px]">
      <div className="p-4 bg-[#fff] h-max text-[#634AE2] rounded-3xl">
        <div className="flex pl-6">
          <div className="w-[60%] pr-4">
            <div className="font-bold text-3xl">Manuel Perez</div>
            <div className="font-bold text-xl">(24 años)</div>
            <div className="align-items-center">
              <div className="flex align-items-center">
                <div className="font-bold pt-5">DNI</div>
                <div className="pt-5 ml-16">...</div>
              </div>
              <div className="flex align-items-center">
                <div className="font-bold pt-5">Celular</div>
                <div className="pt-5 ml-9">999-999-999</div>
              </div>
              <div className="flex align-items-center">
                <div className="font-bold pt-5">Codigo</div>
                <div className="pt-5 ml-9">...</div>
              </div>
            </div>
          </div>
          <div className="w-[35%] pr-3">
            <div className="bg-[#634AE2] rounded-3xl text-[#fff] p-2 text-center">
              <div className="text-4xl">18/10</div>
              <div className="pt-1">última atención</div>
            </div>
            <div className="border-2 border-[#634AE2] rounded-full text-center mt-2 justify-items-center py-2">
              <button>Ver historial clínico</button>
            </div>
          </div>
        </div>
        <hr className="mt-3 border-[#9494F3]" />
        <div className="font-bold text-3xl text-center pt-2">
          Ultima Atencion
        </div>
        <div className="flex">
          <div className="font-bold pt-1 w-20">Diagnóstico</div>
          <div className="pt-1 ml-14">Come demasiado por sobrepensar</div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Observación</div>
          <div className="pt-3 ml-14">
            Puede mejorar si pone de su parte y apoyo familiar
          </div>
        </div>
        <div className="flex">
          <div className="font-bold pt-3 w-20">Últimos objetivos</div>
          <div className="pt-3 ml-14">Viernes 18 de octubre de 2024</div>
        </div>
      </div>
      <textarea
        className="bg-[#fff] w-full border-1 font-light text-[#634AE2] p-6 rounded-3xl mt-3 placeholder:text-[#634AE2]"
        placeholder="Aun no hay comentarios"
      />
      <div className="ml-8 space-x-20">
        <button className="text-[#fff] rounded-full bg-[#634AE2] w-52">
          Agregar atencion
        </button>
        <button
          className="ml-5 border-2 rounded-full border-[#634AE2] text-[#634AE2] w-36"
          onClick={() => setShowCart(true)}>
          Actualizar
        </button>
      </div>
      {showCart && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 justify-center pt-10 z-20 pl-[600px] pr-[550px]"
          onClick={() => setShowCart(false)}
        >
          <div
            className="relative bg-white p-6 rounded-3xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <DetallesPaciente />
          </div>
        </div>
      )}
    </div>
  );
}
