import Container from "@/components/general/container";

import { Button } from "@/components/ui/button";

import { db } from "@/db";
import { Todos } from "@/db/schema";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

import DashboardTable from "@/components/dashboard/DashboardTable";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) return;
  const todos = await db.select().from(Todos).where(eq(Todos.userId, userId));
  console.log("TODOS>>>>", todos);
  // const todoId = 1;
  return (
    <div className="w-full">
      <Container className="flex flex-col gap-8">
        <div className="w-full justify-between items-center flex">
          <h3 className="text-xl font-bold">Your Todos</h3>
          <Button variant={"ghost"} className="flex items-center gap-2" asChild>
            <Link href={"/todos/new"}>
              <span>Add Todo</span>
              <PlusCircle className="w-6 h-6" />
            </Link>
          </Button>
        </div>
        <DashboardTable todos={todos}/>
      </Container>
    </div>
  );
}
