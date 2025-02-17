import { QuienesSomos } from "@/interface";

export default function SobreNosotrosStructure({ qs }: { qs: QuienesSomos[] }) {
  return (
    <div className="w-2/5">
      {qs.map((item, index) => (
        <div key={index} className="">
          <div className="">
            <div className="pt-8 ml-20 text-[#fff] pb-24">
              <section >
                <h2 className="text-5xl font-bold mb-3">¿Quiénes Somos?</h2>
                <p className="font-extralight text-lg pt-3">{item.quienesSomos}</p>
              </section>
  
              <section className="pt-7">
                <h3 className="font-semibold text-2xl">Misión</h3>
                <p className="font-extralight text-lg pt-2">{item.mision}</p>
              </section>

              <section className="pt-7">
                <h3 className="font-semibold text-2xl">Visión</h3>
                <p className="font-extralight text-lg pt-2">{item.vision}</p>
              </section>

              <section className="pt-20">
                <h3 className="font-medium text-3xl">Valores de Marca</h3>
                <div className="pt-7">
                  <h4 className="font-semibold text-2xl">Empatía</h4>
                  <p className="font-extralight text-lg pt-2">{item.valor1}</p>
                </div>
                <div className="pt-7">
                  <h4 className="font-semibold text-2xl">Confianza</h4>
                  <p className="font-extralight text-lg pt-2">{item.valor2}</p>
                </div>
                <div className="pt-7">
                  <h4 className="font-semibold text-2xl">Profesionalismo</h4>
                  <p className="font-extralight text-lg pt-2">{item.valor3}</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
