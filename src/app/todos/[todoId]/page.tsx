import BackButton from "@/components/general/backButton";
import Container from "@/components/general/container";
import ChangePriority from "@/components/todo/changePriority";
import MoreOptions from "@/components/todo/moreOptions";
import { Badge } from "@/components/ui/badge";
import { db } from "@/db";
import { Todos } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function TodoDetaisPage({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return;
  const todoId = parseInt((await params).todoId);

  if (isNaN(todoId)) {
    throw new Error("Invalid Invoice ID");
  }
  const [todos] = await db
    .select()
    .from(Todos)
    .where(and(eq(Todos.userId, userId), eq(Todos.id, todoId)))
    .limit(1);

  if (!todos) {
    notFound();
  }
  console.log("TODO >>>>", todos);
  return (
    <div className="w-full">
      <Container>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* <BackButton /> */}
            <h4 className="text-xl font-bold">{todos?.title}</h4>
            <Badge
              className={cn(
                "rounded-full capitalize",
                todos?.priority === "low" && "bg-green-500 ",
                todos?.priority === "medium" && "bg-yellow-500 ",
                todos?.priority === "high" && "bg-red-500"
              )}
            >
              {todos?.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ChangePriority />
            <MoreOptions />
          </div>
        </div>

        <div className="max-w-sm">
          <p className="text-lg font-medium mt-4">{todos?.description}</p>
        </div>
      </Container>
    </div>
  );
}
