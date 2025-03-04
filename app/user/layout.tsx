import NavbarUser from "@/components/User/NavbarUser";
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
        <div className="lg:hidden block min-h-[80vh] ml-24"> {children} </div>
        <div className="lg:block hidden min-h-[89vh] ml-72"> {children} </div>
      </div>
    </ThemeProvider>
  );
}
