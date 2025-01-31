"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
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
        <Sun className="h-auto w-4" />
      ) : (
        <Moon className="h-auto w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
