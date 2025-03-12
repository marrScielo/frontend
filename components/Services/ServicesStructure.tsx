import { ServicesStructureProps } from "@/interface";
import SliderPrice from "./SliderPrice";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export default function ServicesStructure({
  services,
}: {
  services: ServicesStructureProps[];
}) {
  return (
    <div className="relative">

      {services.map((item, index) => (
        <div className="embla__slide" key={index}>
          <div className="flex justify-between mx-6  pt-6 text-title pb-8 items-center ">
            <p className="text-xl font-semibold lg:pl-[71px] lg:pr-0 pl-2 pr-32">
              {item.title}
            </p>
            <div className="lg:pr-[80px] pr-2">{item.edad}</div>
          </div>

          <div className="block md:hidden">
            <div
              className="lg:h-[578px] flex items-center lg:pl-[79px] lg:pr-0 h-[400px] pr-[200px] pl-8"
              style={{
                backgroundImage: `linear-gradient(rgba(120, 99, 227, 0.612), rgba(120, 99, 227, 0.612)), url(${item.background})`,
                backgroundPosition: "right center",
                backgroundSize: "auto 400px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative w-[700px] flex items-center justify-center text-white text-left h-[230px] font-bold text-[40px] leading-[54px]">
                {item.motto}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div
              className="lg:h-[578px] flex items-center lg:pl-[79px] lg:pr-0 h-[400px] pr-[200px] pl-8"
              style={{
                backgroundImage: `linear-gradient(270deg, rgba(99, 74, 226, 0.24) 28.05%, rgba(99, 74, 226, 1) 47.87%),url(${item.background})`,
                backgroundPosition: "right center",
                backgroundSize: "auto",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="relative w-[661px] flex items-center justify-center text-white text-left h-[230px] font-bold text-[40px] leading-[54px]">
                {item.motto}
              </div>
            </div>
          </div>

          <div className="pt-12 flex justify-center">
            <div className="lg:max-w-[829px] max-w-[480px] text-title h-[89px] font-normal text-[16px] leading-[28px] text-center">
              {item.description}
            </div>
          </div>

          <div
            className="block md:hidden w-[600px] h-[728px] mt-10"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url(${item.bgup})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "600px 728px",
            }}
          />

          <div className="mt-12 lg:pt-5 flex justify-center px-4 md:px-0">
            <div className="w-full text-title md:w-[937px] h-auto md:h-[74px]  font-semibold text-[28px] md:text-[24px] leading-[28px] md:leading-[33px] text-center">
              {item.tittlecards}
            </div>
          </div>

          <div className="flex justify-center pt-5">
            <div className="block md:hidden w-96">
              {/* Solo visible en pantallas pequeñas */}
              <Carousel className="w-full bg-transparent">
                <CarouselContent>
                  {item.cards?.slice(0, 5).map((card, index) => (
                    <CarouselItem key={index}>
                      <Card className="border-none bg-transparent">
                        <CardContent className="p-0">
                          <span className="text-4xl font-semibold">
                            <div
                              key={card.id}
                              className="flex flex-col rounded-3xl bg-[#634AE2] items-center gap-4 p-4 h-[200px]"
                            >
                              <div className="w-full md:w-[360px] h-auto md:h-[236px] flex flex-col rounded-lg p-4">
                                <div className="flex justify-center items-center">
                                  <img
                                    src={card.icon}
                                    alt={card.text}
                                    className="w-[140px] md:w-[183.27px] h-[68px] md:h-[88px] object-contain"
                                  />
                                </div>
                                <div className="flex-grow flex items-center justify-center px-4 pt-5">
                                  <p className="text-center text-[14px] md:text-[16px] text-white font-normal leading-[20px] md:leading-[24px] w-full">
                                    {card.text}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </span>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  variant="ghost"
                  className="text-[#634AE2] hover:bg-violet-300 bg-inherit border-none "
                />
                <CarouselNext
                  variant="ghost"
                  className="text-[#634AE2] hover:bg-violet-300 bg-inherit border-none "
                />
              </Carousel>
            </div>
          </div>

          <div className="hidden md:flex justify-center py-8 px-4 md:px-8">
            {/* Oculto en móviles, visible en pantallas medianas y grandes */}
            <div className="flex flex-col items-center gap-y-12">
              <div className="flex flex-col xl:flex-row gap-y-8 md:gap-x-8">
                {item.cards?.slice(0, 3).map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col rounded-3xl bg-[#634AE2] items-center gap-4 p-4"
                  >
                    <div className="w-full md:w-[360px] h-auto md:h-[236px] flex flex-col rounded-lg p-4">
                      <div className="flex justify-center items-center">
                        <img
                          src={card.icon}
                          alt={card.text}
                          className="w-[140px] md:w-[183.27px] h-[68px] md:h-[88px] object-contain"
                        />
                      </div>
                      <div className="flex-grow flex items-center justify-center px-4">
                        <p className="text-center text-[14px] md:text-[16px] text-white font-normal leading-[20px] md:leading-[24px] w-full">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col xl:flex-row gap-y-8 md:gap-x-8">
                {item.cards?.slice(3, 5).map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col rounded-3xl bg-[#634AE2] items-center gap-4 p-4"
                  >
                    <div className="w-full md:w-[360px] h-auto md:h-[236px] flex flex-col rounded-lg p-4">
                      <div className="flex justify-center items-center">
                        <img
                          src={card.icon}
                          alt={card.text}
                          className="w-[140px] md:w-[183.27px] h-[68px] md:h-[88px] object-contain"
                        />
                      </div>
                      <div className="flex-grow flex items-center justify-center px-4">
                        <p className="text-center text-[14px] md:text-[16px] text-white font-normal leading-[20px] md:leading-[24px] w-full">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className="hidden md:block"
            style={{
              backgroundImage: `url(${item.bgdown})`,
              backgroundPosition: "right bottom",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1280px 788px",
            }}
          >
            <div className="pt-8 md:pt-24 flex items-center px-10 md:px-0 md:pl-96">

              <div className="w-full max-w-[837px] text-title h-[74px] font-semibold text-[24px] leading-[33px] text-center">
                {item.tittleIcon}
              </div>
            </div>

            <div className="flex justify-start pl-64 pb-32 pt-8 w-full h-auto">
              <div className="flex pt-14 flex-col items-center gap-y-20">
                {/* Primera fila - 3 iconos */}
                <div className="flex flex-col md:flex-row lg:gap-y-0  gap-y-12 md:gap-y-0 md:gap-x-[229px]">
                  {item.iconos?.slice(0, 3).map((icono, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className=" rounded-full  bg-[#9494F3] p-6">
                        <div className="w-32 h-32 flex items-center justify-center">
                          <img
                            src={icono.iconImage}
                            alt={icono.text}
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                      </div>
                      <p className="text-center pt-3 text-[16px] text-title  font-semibold leading-[20px] max-w-[200px]">
                        {icono.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-y-12 md:gap-y-0 md:gap-x-[229px]">
                  {item.iconos?.slice(3, 5).map((icono) => (
                    <div
                      key={icono.id}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="rounded-full bg-[#9494F3] p-6">
                        <div className="w-32 h-32 flex items-center justify-center">
                          <img
                            src={icono.iconImage}
                            alt={icono.text}
                            className="w-20 h-20 object-contain"
                          />
                        </div>
                      </div>

                      <p className="text-center pt-3 text-[16px] text-title font-semibold leading-[20px] max-w-[120px]">
                        {icono.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="block md:hidden">
            <div className="pt-8 flex items-center px-10 ">
              <div className="w-full max-w-[837px] text-title h-[74px] font-semibold text-[24px] leading-[33px] text-center">
                {item.tittleIcon}
              </div>
            </div>

            <div className="flex justify-center pt-8 pb-28">
              <div className="block md:hidden w-96">
                <Carousel className="w-full bg-transparent pt-16">
                  <CarouselContent>
                    {item.iconos?.slice(0, 5).map((icono, index) => (
                      <CarouselItem key={index}>
                        <div
                          key={icono.id}
                          className="flex flex-col items-center gap-4"
                        >
                          <div className="rounded-full bg-[#9494F3] p-6">
                            <div className="w-32 h-32 flex items-center justify-center">
                              <img
                                src={icono.iconImage}
                                alt={icono.text}
                                className="w-20 h-20 object-contain"
                              />
                            </div>
                          </div>

                          <p className="text-center pt-3 text-[16px] text-title font-semibold leading-[20px] max-w-[120px]">
                            {icono.text}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious
                    variant="ghost"
                    className="text-[#634AE2] hover:bg-violet-300 bg-inherit border-none "
                  />
                  <CarouselNext
                    variant="ghost"
                    className="text-[#634AE2] hover:bg-violet-300 bg-inherit border-none "
                  />
                </Carousel>
              </div>
            </div>
          </div>

          <SliderPrice />
          <div className="sticky bottom-0 left-0 w-full bg-[#DEDEFF] flex justify-center items-center z-[50] h-48 md:h-20">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full md:max-w-[1230px] px-6 space-x-0">
              <p
                className="text-[18px] w-full font-medium text-[#634AE2] text-center md:text-start"
                dangerouslySetInnerHTML={{ __html: item.textfooter }}
              />


          <div className="sticky bottom-0 left-0 w-full bg-[#DEDEFF] flex justify-center items-center z-[50] h-20">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1230px] px-6 space-x-0 ">
              <p
                className="text-[18px] w-full font-medium text-[#634AE2] md:text-start"
                dangerouslySetInnerHTML={{ __html: item.textfooter }}
              />


              <Link href="/ReservarCita">
                <button className="w-full md:w-[329px] h-10 md:h-[50px] bg-[#5A4AE8] rounded-[34px] text-white font-normal text-[18px] leading-[33px] text-center mt-6 md:mt-0 px-16 md:px-0">
                  Reserva tu cita gratuita
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
