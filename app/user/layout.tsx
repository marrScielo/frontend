import NavbarUser from "@/components/NavbarUser";
import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";

export default function HomeLayout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-[#eaeded] min-h-screen">
        <NavbarUser />
        <div className="lg:hidden block min-h-full mt-[5vh] ml-24"> {children} </div>
        <div className="lg:block hidden min-h-full  ml-72"> {children} </div>
      </div>
    </ThemeProvider>
  );
}
