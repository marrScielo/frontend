"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Icons } from "@/icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <label className="relative inline-block w-16 h-8">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={theme === "light" }
          onChange={toggleTheme}
        />
        <span
          className={`absolute h-[33px] cursor-pointer top-0 left-0 right-0 bottom-0 transition-all duration-1500 rounded-full ${
            theme === "light"  ? "bg-[#9494F3]" : "bg-[#9494F3]"
          }`}
        >
          <span
            className={`absolute h-[33px] w-[33px] bg-[#634AE2] rounded-full transition-all duration-1500  ${
              theme === "light"  ? "translate-x-8" : "translate-x-0"
            }`}
          ></span>
        </span>

        <span
          className="sun absolute top-1/2 right-[2px] z-10 w-6 h-6 transition-all duration-1500  transform -translate-y-1/2"
          dangerouslySetInnerHTML={{ __html: Icons.sun }}
        ></span>

        <span
          className="moon absolute top-1/2 left-2 z-10 w-6 h-6 transition-all duration-1500 transform -translate-y-1/2"
          dangerouslySetInnerHTML={{ __html: Icons.moon }}
        ></span>
      </label>
    </div>
  );
}