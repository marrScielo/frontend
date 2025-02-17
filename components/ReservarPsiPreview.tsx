"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
//import { Button } from "@/components/ui/button"

import ReactCountryFlag from "react-country-flag";
import { Modal, ModalContent, ModalBody, Button } from "@heroui/react";

import React from "react";

interface psicologo {
  id: number;
  name: string;
  lastname: string;
  description: string;
  img: string;
  link: string;
  flag: string;
  information: string;
  specialties: { id: number; texto: string }[];
}

export default function ReservarPsiPreview({
  psicologo,
}: {
  psicologo: psicologo;
}) {
  const [isScheduleOpen, setIsScheduleOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <>
      <Card className="w-[480px] max-h-[280px] bg-background p-5 rounded-3xl border-[#9494F3] border-t-[0.5px]">
        <div>
          <div className="w-full grid grid-cols-3 grid-rows-1">
            <div className="col-span-1 flex justify-center">
              <div className="flex items-center relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={psicologo.img} />
                </Avatar>
                <div className="absolute -bottom-[2px] -right-2 w-10 h-10">
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                    countryCode={psicologo.flag}
                  />
                </div>
              </div>
            </div>{" "}
            <div className=" w-fullcol-span-2 text-[#634AE2]">
              <CardDescription className="text-[#634AE2]">
                Psicologo
              </CardDescription>
              <CardTitle className="text-[#634AE2] text-2xl">
                {psicologo.name}
              </CardTitle>
              <CardTitle className="text-[#634AE2] text-2xl">
                {psicologo.lastname}
              </CardTitle>
            </div>
          </div>
        </div>
        <CardContent className=" border-[#9494F3] mt-2">
          <p
            className="text-[#634AE2] pt-3"
            dangerouslySetInnerHTML={{ __html: psicologo.description }}
          />
          <CardFooter className="flex justify-center space-x-8 pt-3 text-xs">
            <Button
              onPress={() => setIsScheduleOpen(true)}
              className="rounded-3xl bg-[#E7E7FF] px-8 py-0 text-[#634AE2] font-light"
            >
              Agendar
            </Button>

            <Button
              onPress={() => setIsProfileOpen(true)}
              className="rounded-3xl bg-[#fff] px-8 py-0 border-color[#634AE2] font-light border-1 text-[#634AE2]"
            >
              Ver Perfil
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
      {/* modal de perfil de psicologo*/}
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
                        src={psicologo.img}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                  </div>

                  <div className="text-[#634AE2] text-start ">
                    <div className="space-y-1 px-1">
                      <div className="text-[#634AE2] text-2xl font-semibold">
                        {psicologo.name} {psicologo.lastname}
                      </div>
                    </div>
                    <hr className="my-2.5 border-t border-[#9494F3] w-64" />
                    <ModalBody className="py-2 px-1 gap-0.5">
                      <p className="text-[#634AE2] font-normal text-base">
                        Especialidades:
                      </p>
                      <div className="flex gap-2 mt-1.5 mb-1">
                        {psicologo.specialties.map((Item, index) => (
                          <span
                            key={index}
                            className="px-4 py-1 bg-[#E7E7FF] text-[#634AE2] rounded-full text-sm"
                          >
                            {Item.texto}
                          </span>
                        ))}
                      </div>
                      <hr className="my-2.5 border-t border-[#9494F3] w-11/12" />
                      <p className="text-[#634AE2] text-sm  leading-[22px] content-normal mr-1">
                        {psicologo.information}
                      </p>
                    </ModalBody>

                    <div className="flex justify-start px-1 mt-2">
                      <Button
                        className="rounded-3xl bg-[#634AE2] text-white px-6 text-sm font-normal "
                        onPress={() => {
                          setIsScheduleOpen(true);
                          setIsProfileOpen(false);
                        }}
                      >
                        Agendar
                      </Button>
                    </div>
                  </div>
                </div>
              </ModalContent>
            </>
          )}
        </ModalContent>
      </Modal>

      {/*modal de agendar cita*/}
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
        <ModalContent>{() => <>soy cale4ndario</>}</ModalContent>
      </Modal>
    </>
  );
}
