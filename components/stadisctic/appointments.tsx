export default function Appointments() {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 m-5 place-items-center gap-5 max-w-[920px] mx-auto">
      
      <div className="w-[547px] h-[459px] bg-white rounded-2xl ">
      <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
          <p className="text-white font-medium text-start mr-10 text-xl">Citas totales <br/> del período: </p>
        </div>
        <p className="text-black text-lg font-bold">Buenas</p>
      </div>

      {/* Segundo contenedor con dos cuadros internos */}

      <div className="h-[459px] w-[353px] bg-white rounded-2xl  ">
      <div className="rounded-r-full w-[247px] h-[60px] bg-[#6364F4] mt-6 flex items-center justify-center">
          <p className="text-white font-medium text-start mr-10 text-xl">Estado de <br/>cita:</p>
        </div>
        <p className="text-black text-lg font-bold">Buenas</p>
      </div>
    </div>
  );
}
