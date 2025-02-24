import { QuienesSomos } from "@/interface";

export default function SobreNosotrosStructure({ qs }: { qs: QuienesSomos[] }) {
  return (
    <div className="w-full">
      {qs.map((item, index) => (
        <div key={index} className="text-center ">
          <div className="pt-8  text-[#fff]  ">
            <section>
              <h2 className="text-5xl font-bold mb-3">¿Quiénes Somos?</h2>
              <p
                className="font-extralight text-lg pt-3"
                dangerouslySetInnerHTML={{ __html: item.quienesSomos }}
              />
            </section>

            <section className="pt-7">
              <h3 className="font-semibold text-2xl">Misión</h3>
              <p
                className="font-extralight text-lg pt-2"
                dangerouslySetInnerHTML={{ __html: item.mision }}
              />
            </section>

            <section className="pt-7">
              <h3 className="font-semibold text-2xl">Visión</h3>
              <p
                className="font-extralight text-lg pt-2"
                dangerouslySetInnerHTML={{ __html: item.vision }}
              />
            </section>
            <div
            className="w-full h-full pt-[57.2vh]"
            style={{
              backgroundImage: `linear-gradient(to right, #3616D87A 0%, #3616D870 30%, #7863E37A 70%, #7863E370 100%),url('/AboutUs/manos.webp')`,
              backgroundColor: "#fff",
              backgroundSize: "cover",
              backgroundPosition: " center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

            <section className="pt-20">
              <h3 className="font-medium text-3xl">Valores de Marca</h3>
              <div className="pt-7">
                <h4 className="font-semibold text-2xl">Empatía</h4>
                <p
                  className="font-extralight text-lg pt-2"
                  dangerouslySetInnerHTML={{ __html: item.valor1 }}
                />
              </div>
              <div className="pt-7">
                <h4 className="font-semibold text-2xl">Confianza</h4>
                <p
                  className="font-extralight text-lg pt-2"
                  dangerouslySetInnerHTML={{ __html: item.valor2 }}
                />
              </div>
              <div className="pt-7">
                <h4 className="font-semibold text-2xl">Profesionalismo</h4>
                <p
                  className="font-extralight text-lg pt-2"
                  dangerouslySetInnerHTML={{ __html: item.valor3 }}
                />
              </div>
            </section>
          </div>
          <div
            className="w-full h-full pt-[75vh]"
            style={{
              backgroundImage: `linear-gradient(to right, #3616D87A 0%, #3616D870 30%, #7863E37A 70%, #7863E370 100%),url('/AboutUs/familiafeliz.webp')`,
              backgroundColor: "#fff",
              backgroundSize: "cover",
              backgroundPosition: " center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}
