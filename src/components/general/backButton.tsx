"use client";
import {  Table } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  const goBack = () => {
    router.push('/dashboard');
  };
  return (
    <Button variant={"ghost"} onClick={goBack}>
      <Table size={5} />
    </Button>
  );
}
