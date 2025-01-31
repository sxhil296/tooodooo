"use server";

import { redirect } from "next/navigation";

export async function createTodoAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priority = formData.get("priority") as string;
  console.log(formData);

  redirect("/dashboard");
}
