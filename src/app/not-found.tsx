import Container from "@/components/general/container";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Container>
      <div className="flex justify-center items-center h-full flex-col gap-6">
        <div className="text-4xl font-bold">404</div>
        <p className="text-xl font-medium">Page Not Found</p>
        <Button asChild>
          <Link href={"/"} className="flex items-center gap-2">
            Home <Home />
          </Link>
        </Button>
      </div>
    </Container>
  );
}
