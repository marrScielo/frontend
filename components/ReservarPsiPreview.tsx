"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@heroui/react";
//import { Button } from "@/components/ui/button"
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface psicologo {
  name: string;
  lastname: string;
  description: string;
  img: string;
  link: string;
  flag: string;
}
const profiles =[
  {
      id:"/profile",
    },
  ]
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
            <Button className="rounded-3xl bg-[#E7E7FF] px-8 py-0 text-[#634AE2] font-light">
              Agendar
            </Button>
            <Link href={profiles[0].id}>
      <Button className="rounded-3xl bg-[#fff] px-8 py-0 border border-[#634AE2] font-light text-[#634AE2]">
        Ver Perfil
      </Button>
    </Link>  
          </CardFooter>
        </CardContent>
      </Card>
    </>
  );
}
