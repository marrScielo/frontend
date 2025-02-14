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
import { Button } from "@/components/ui/button"

export default function BlogPreview() {
  return (
    <>
      <Card className="w-[380px] h-[260] bg-background p-5 rounded-3xl border-[#9494F3] border-t-[0.5px]">
        <div >
          <div className="w-2 grid grid-cols-1 md:grid-cols-3">
            <Avatar className="w-24 h-24 ">
              <AvatarImage src={"https://github.com/shadcn.png"} />
            </Avatar>
            <div className="ml-32 col-span-1 text-[#634AE2]">
              <CardHeader className="space-y-0 pb-2">
              <CardDescription className="text-[#634AE2]">Psicólogo</CardDescription>
                <CardTitle className="text-[#634AE2] text-2xl" >Nombre</CardTitle>
                <CardTitle className="text-[#634AE2] text-2xl" >Apellido</CardTitle>
              </CardHeader>
            </div>
          </div>
        </div>
        <CardContent className=" border-[#9494F3] mt-2">
          <p className="text-[#634AE2] pt-3"> Epecialidad / Maestría / Doctorado <br/> + 00 Años de experiencia</p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-8 pt-3 text-xs">
        <Button className="rounded-3xl bg-[#E7E7FF] px-8 py-0 text-[#634AE2] font-light">Agendar</Button>
        <Button className="rounded-3xl bg-[#fff] px-8 py-0 border-color[#634AE2] font-light border-1 text-[#634AE2]">Ver Perfil</Button>
        </CardFooter>
      </Card>
    </>
  );
}
