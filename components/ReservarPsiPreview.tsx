"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import ReactCountryFlag from "react-country-flag";
import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";
import { PsicologoPreviewData } from "@/interface";
import { useState } from "react";

export default function ReservarPsiPreview({
  psicologo,
}: {
  psicologo: PsicologoPreviewData;
}) {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <Card className="w-full bg-background p-5 rounded-3xl border-[#9494F3] border-t-[0.5px]">
        <div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="col-span-1 flex sm:justify-start">
              <div className="flex items-center relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={psicologo.imagen} />
                </Avatar>
                <div className="absolute -bottom-[2px] -right-2 w-8 h-8 sm:w-10 sm:h-10">
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                    countryCode={psicologo.pais}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2 text-[#634AE2]">
              <CardDescription className="text-[#634AE2]">
                Psicólogo
              </CardDescription>
              <CardTitle className="text-[#634AE2] text-xl sm:text-2xl">
                {psicologo.nombre} <br />
                {psicologo.apellido}
              </CardTitle>
            </div>
          </div>
          <hr className="my-2.5 border-t border-[#9494F3] w-[390px]" />
        </div>

        <CardContent className="border-[#9494F3] mt-2">
          <p className="text-[#634AE2] pt-3 text-sm sm:text-base">
            {psicologo.introduccion.slice(0, 50)}...
          </p>
          <CardFooter className="grid grid-cols-2 gap-2 sm:flex sm:space-x-8 pt-3 text-xs">
            <Button
              onPress={() => setIsScheduleOpen(true)}
              className="rounded-3xl bg-[#E7E7FF] px-6 sm:px-8 py-1 sm:py-0 text-[#634AE2] font-light"
            >
              Agendar
            </Button>
            <Button
              onPress={() => setIsProfileOpen(true)}
              className="rounded-3xl bg-[#fff] px-6 sm:px-8 py-1 sm:py-0 border-[#634AE2] font-light border-1 text-[#634AE2]"
            >
              Ver Perfil
            </Button>
          </CardFooter>
        </CardContent>
      </Card>

      {/*modal de profile */}
      <Modal
        isOpen={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        size={"2xl"}
        backdrop="opaque"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#d8dceb]/50 backdrop-opacity-40",
          base: "border-[#d8dceb] bg-[#ffffff] dark:bg-[#ffffff] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#d8dceb]",
          footer: "border-t-[1px] border-[#d8dceb]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {() => (
            <>
              <ModalContent className="w-[695px] h-[416px] bg-background rounded-3xl  overflow-hidden  mt-8">
                <div className="grid grid-cols-[0.8fr_1.6fr] items-center">
                  <div className="h-full w-full flex ">
                    <Avatar className="w-[208px] h-[416px] rounded-2xl overflow-hidden">
                      <AvatarImage
                        src={psicologo.imagen}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                  </div>

                  <div className="text-[#634AE2] text-start ">
                    <div className="space-y-1 px-1">
                      <div className="text-[#634AE2] text-2xl font-semibold">
                        {psicologo.nombre} {psicologo.apellido}
                      </div>
                    </div>
                    <hr className="my-2.5 border-t border-[#9494F3] w-64" />
                    <ModalBody className="py-2 px-1 gap-0.5">
                      <p className="text-[#634AE2] font-normal text-base">
                        Especialidades:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1.5 mb-1 ">
                        {psicologo.especialidades.map((item, index) => (
                          <span
                            key={index}
                            className="px-4 py-1 bg-[#E7E7FF] text-[#634AE2] rounded-full text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <hr className="my-2.5 border-t border-[#9494F3] w-11/12" />
                      <p className="text-[#634AE2] text-sm  leading-[22px] content-normal mr-1">
                        {psicologo.introduccion}
                      </p>
                    </ModalBody>
                  </div>
                </div>
              </ModalContent>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isScheduleOpen}
        onOpenChange={setIsScheduleOpen}
        size={"2xl"}
        backdrop="opaque"
        classNames={{
          body: "py-6",
          backdrop: "bg-[#d8dceb]/50 backdrop-opacity-40",
          base: "border-[#d8dceb] bg-[#ffffff] dark:bg-[#ffffff] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#d8dceb]",
          footer: "border-t-[1px] border-[#d8dceb]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          <ModalBody>
            <div className="flex flex-col items-center justify-center">

              <div className="w-full flex justify-center">
                <Button
                  onPress={() => setIsScheduleOpen(false)}
                  className="rounded-3xl bg-[#E7E7FF] px-6 sm:px-8 py-1 sm:py-0 text-[#634AE2] font-light"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
