import Todo from "@/components/todo/todo";

import { db } from "@/db";
import { Todos } from "@/db/schema";

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
  return <Todo todo={todos} />;
}
