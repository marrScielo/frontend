import { useState } from "react";
import { Icons } from "@/icons";

interface ReservarComponentSearchProps {
  onSearchChange: (term: string) => void;
}

export default function ReservarComponentSearch({ onSearchChange }: ReservarComponentSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  
  return (
    <div className="w-full m-10 sm:w-80 mx-auto ">

      {/* Mobile: Search  */}
      <div className="flex flex-col gap-4 sm:hidden">
        <div className="relative mx-auto">
          <input
            type="text"
            placeholder="Nombre"
            className="pl-12 pr-3 text-lg h-9 outline-none focus:ring-0 focus:outline-none w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#EAEAFF]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span
            className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
            dangerouslySetInnerHTML={{
              __html: Icons.loup.replace(/<svg /, '<svg fill="currentColor" '),
            }}
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
          />
        </div>
      </div>

      {/* Desktop: Search  */}
      <div className="hidden sm:block">
        <div className="relative ">
          <input
            type="text"
            placeholder="Nombre"
            className="pl-12  text-lg h-9 outline-none  w-full rounded-full border-none placeholder:text-[#634AE2] bg-[#EAEAFF]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span
            className="text-[#634AE2] transition-colors absolute right-3 top-1/2 transform -translate-y-1/2"
            dangerouslySetInnerHTML={{
              __html: Icons.loup.replace(/<svg /, '<svg fill="currentColor" '),
            }}
            style={{
              width: "1.2em",
              height: "1.2em",
            }}
          />
        </div>
      </div>
    </div>
  );
}