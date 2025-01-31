"use server";

import { db } from "@/db";
import { Todos } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
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

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(results);
  redirect(`/todos/${results[0].id}`);
}
