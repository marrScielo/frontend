export default function Appointments() {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 m-5 place-items-center gap-5 max-w-[950px] mx-auto">
      <div className="w-[547px] h-[459px] bg-white rounded-2xl flex items-center justify-center ">
        <p className="text-black text-lg font-bold">Buenas</p>
      </div>

      {/* Segundo contenedor con dos cuadros internos */}

      <div className="h-[459px] w-[353px] bg-white rounded-2xl flex items-center justify-center ">
        <p className="text-black text-lg font-bold">Buenas</p>
      </div>
    </div>
  );
}
