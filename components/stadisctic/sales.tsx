export default function Sales() {
  return (
    <div className="grid xl:grid-cols-2 lg:grid-cols-1 m-5 place-items-center gap-5 max-w-[950px] mx-auto">
      <div className="flex flex-col w-[547px] h-[660px] gap-5">
        <div className="w-full h-[406px] bg-white rounded-2xl flex items-center justify-center ">
          <p className="text-black text-lg font-bold">Buenas</p>
        </div>

        <div className="w-full h-[234px] bg-white rounded-2xl flex items-center justify-center ">
          <p className="text-black text-lg font-bold">Buenas 2</p>
        </div>
      </div>
      <div className="w-[353px] h-[660px] bg-white rounded-2xl flex items-center justify-center ">
        <p className="text-black text-lg font-bold">Buenas</p>
      </div>

      {/* Segundo contenedor con dos cuadros internos */}
    </div>
  );
}
