"use client";

import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="border-0"
    >
      {theme === "light" ? (
        <SunIcon className="h-auto w-4" />
      ) : (
        <MoonIcon className="h-auto w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
