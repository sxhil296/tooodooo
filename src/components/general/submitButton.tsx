"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  console.log("PENDING", pending);
  return (
    <Button className="relative w-full font-semibold">
      <span className={pending ? "text-transparent" : ""}>Submit</span>
      {pending && (
        <span className="flex justify-center items-center absolute w-full h-full text-zinc-400">
          <LoaderCircle className="animate-spin" />
        </span>
      )}
    </Button>
  );
}
