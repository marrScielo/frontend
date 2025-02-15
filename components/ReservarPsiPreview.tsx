"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@heroui/react";
//import { Button } from "@/components/ui/button"

interface psicologo {
  name: string;
  lastname: string;
  description: string;
  img: string;
  link: string;
}

export default function ReservarPsiPreview({
  psicologo,
}: {
  psicologo: psicologo;
}) {
  return (
    <>
      <Card className="w-[480px] max-h-[280px] bg-background p-5 rounded-3xl border-[#9494F3] border-t-[0.5px]">
        <div>
          <div className="w-full grid grid-cols-3 grid-rows-1">
            <div className="col-span-1 relative ">
              <Avatar className="w-24 h-24">
                <AvatarImage src={psicologo.img} />
              </Avatar>
              <img
                src={psicologo.img}
                alt="img"
                className="absolute -bottom-[4px] right-8 w-14  rounded-full border-2 border-white shadow-sm z-10"
              />
            </div>
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
            <Button className="rounded-3xl bg-[#E7E7FF] px-8 py-0 text-[#634AE2] font-light">
              Agendar
            </Button>
            <Button className="rounded-3xl bg-[#fff] px-8 py-0 border-color[#634AE2] font-light border-1 text-[#634AE2]">
              Ver Perfil
            </Button>
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
}
