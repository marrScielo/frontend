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
import { Button } from "@/components/ui/button";


export default function ProfileView() {
  return (
    <>
      <Card className="w-[695px] h-[416px] bg-background rounded-3xl border-[#9494F3] border-[0.5px] overflow-hidden  mt-8">
        <div className="grid grid-cols-[0.8fr_1.6fr] gap-6 items-center">
          <div className="h-full w-full flex ">
            <Avatar className="w-[208px] h-[416px] rounded-2xl overflow-hidden">
              <AvatarImage
                src={"https://github.com/shadcn.png"}
                className="w-full h-full object-cover"
              />
            </Avatar>
          </div>

          <div className="text-[#634AE2]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-[#634AE2] text-2xl font-bold">
                Nombre Apellidos
              </CardTitle>
            </CardHeader>

            <CardContent className="mt-2">
              <p className="text-[#634AE2] font-semibold">Especialidades:</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-[#E7E7FF] text-[#634AE2] rounded-xl text-sm">
                  TDAH
                </span>
                <span className="px-3 py-1 bg-[#E7E7FF] text-[#634AE2] rounded-xl text-sm">
                  Dislexia
                </span>
                <span className="px-3 py-1 bg-[#E7E7FF] text-[#634AE2] rounded-xl text-sm">
                  Aprendizaje
                </span>
              </div>

              <p className="text-[#634AE2] text-sm mt-4 leading-[22px]">
                Licenciada Psicopedagogía con una amplia experiencia en
                estimulación cognitiva, orientación vocacional, técnicas de
                estudio y estrategias para mejorar memoria, atención y
                habilidades cognitivas. Además, brinda acompañamiento a familias
                y docentes para potenciar el desarrollo integral en cada etapa
                de la vida.
              </p>
            </CardContent>

            <CardFooter className="flex justify-start pt-4">
              <Button className="rounded-3xl bg-[#634AE2] text-white px-8 py-2 text-sm">
                Agendar
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    </>
  );
}
