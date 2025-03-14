"use server";

import { db } from "@/db";
import { Todos } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTodoAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as "high" | "medium" | "low";
  console.log(formData);

  const results = await db
    .insert(Todos)
    .values({
      title,
      description,
      priority,
      userId,
      completed: false,
    })
    .returning({
      id: Todos.id,
    });

  console.log(results);
  redirect(`/todos/${results[0].id}`);
}

export async function changePriorityAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  const todoId = formData.get("id") as string;
  const priority = formData.get("priority") as "high" | "medium" | "low";

  const results = await db
    .update(Todos)
    .set({
      priority,
    })
    .where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId))));

  console.log("priority results", results);
  revalidatePath(`/todos/${todoId}`, "page");
}

export async function deleteTodoAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const todoId = formData.get("id") as string;
  const results = await db
    .delete(Todos)
    .where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId))));
  console.log("delete results", results);
  redirect("/dashboard");
}

export async function toggleCompletedAction(formData: FormData) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const todoId = formData.get("id") as string;

  const currentTodo = await db.select().from(Todos).where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId)))).limit(1)
  if (!currentTodo) {
    throw new Error("Todo not found");
  }
  const newCompletedStatus = !currentTodo[0].completed;
  const results = await db
    .update(Todos)
    .set({
      completed: newCompletedStatus,
    })
    .where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId))))
  console.log("toggle results", results);
  revalidatePath(`/todos/${todoId}`, "page");
}


export async function editTodoAction(formData:FormData){
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  const todoId = formData.get("id") as string;
  const currentTodo = await db.select().from(Todos).where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId)))).limit(1)
  if (!currentTodo) {
    throw new Error("Todo not found");
  }
  const newTitle = formData.get("title") as string || currentTodo[0].title;
  const newDescription = formData.get("description") as string || currentTodo[0].description;
  const newPriority = formData.get("priority") as "high" | "medium" | "low" || currentTodo[0].priority;

  const results = await db
    .update(Todos)
    .set({
      title: newTitle,
      description: newDescription,
      priority: newPriority,
    })
    .where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId))));

  console.log("edit results", results);
  redirect(`/dashboard`);
}