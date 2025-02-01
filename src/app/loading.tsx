import Container from "@/components/general/container";
import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full">
      <Container className="flex justify-center items-center h-full">
        <LoaderCircle className="animate-spin w-20 h-auto" />
      </Container>
    </div>
  );
}
