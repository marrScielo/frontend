import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/icons";
import Link from "next/link";
//import { VisuallyHidden } from "@/components/ui/visually-hidden"; <- esto estaba buscar radix ui arreglar eso da errores
export function MobileNavbar({ navItems }: any) {
  return (
    <Sheet>
    <SheetTrigger asChild>
      <div
        className="cursor-pointer"
        dangerouslySetInnerHTML={{ __html: Icons.hamburger }}
      />
    </SheetTrigger>
    <SheetContent className="">
      <SheetHeader>
        <SheetTitle className="sr-only">Menu</SheetTitle>
      </SheetHeader>
      <div className="grid gap-3 py-4 mt-4">
        {navItems.map((navItem: any, idx: number) => (
          <div className="w-full" key={idx}>
            <Button className="w-full bg-white text-[#634AE2] text-sm sm:text-base border-2 border-[#634AE2] hover:bg-[#634AE2] hover:text-white transition-colors duration-300 rounded-xl py-1 sm:py-2 px-3 sm:px-4 font-medium">
              <Link href={navItem.link}>{navItem.name}</Link>
            </Button>
          </div>
        ))}
      </div>
    </SheetContent>
  </Sheet>
  );
}

    /*    anterior formato
    <Sheet>
      <SheetTrigger asChild>
        <div
          className="cursor-pointer"
          dangerouslySetInnerHTML={{ __html: Icons.hamburger }}
        />
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
        {<VisuallyHidden.Root>}
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden.Root>
        </SheetHeader>
        <div className="grid gap-3 py-4 mt-4">
          {navItems.map((navItem: any, idx: number) => (
            <div className="w-full" key={idx}>
              <Button className="w-full bg-white text-[#634AE2] text-sm sm:text-base border-2 border-[#634AE2] hover:bg-[#634AE2] hover:text-white transition-colors duration-300 rounded-xl py-1 sm:py-2 px-3 sm:px-4 font-medium">
                <Link href={navItem.link}>{navItem.name}</Link>
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
    */