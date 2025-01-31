"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <Button variant={"ghost"} onClick={goBack}>
      <ChevronLeft size={5} />
    </Button>
  );
}
