import Container from "@/components/general/container";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex justify-center items-center">
      <Container className="flex justify-center flex-col gap-6 items-center">
        <h1 className="text-5xl font-bold ">tooodooo</h1>
        <p className="text-center text-lg">
          a simple todo app just to complete the challenge of making it under 2
          hours
        </p>
        <p className="flex items-center gap-4">
          <Button asChild variant={"outline"} className="w-28">
            <Link href={"/github"}>GitHub</Link>
          </Button>
          <Button asChild>
            <Link href={"/dashboard"}>Dashboard</Link>
          </Button>
        </p>
      </Container>
    </main>
  );
}
