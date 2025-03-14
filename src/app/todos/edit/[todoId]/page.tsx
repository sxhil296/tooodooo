import { editTodoAction } from "@/app/actions";
import Container from "@/components/general/container";
import SubmitButton from "@/components/general/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";
import { Todos } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import Form from "next/form";

export default async function EditTodoPage({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const { todoId } = await params;
  const { userId } = await auth();
  if (!userId) return;
  const todos: (typeof Todos.$inferSelect)[] = await db
    .select()
    .from(Todos)
    .where(and(eq(Todos.userId, userId), eq(Todos.id, parseInt(todoId))));
  const todo = todos[0];
  console.log(todo);

  return (
    <div className="w-full">
      <Container>
        <h3 className="text-2xl font-bold mb-6">Edit Todo</h3>
        <Form
          action={editTodoAction}
          className="w-full max-w-xl flex flex-col gap-6"
        >
          <input type="hidden" name="id" value={todo?.id} id="id" />
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="font-medium text-lg">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Title of your todo"
              required
              defaultValue={todo?.title}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="font-medium text-lg">
              Description
            </Label>
            <Textarea
              rows={6}
              id="description"
              name="description"
              placeholder="Description of your todo"
              required
              defaultValue={todo?.description}
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="priority" className="font-medium text-lg">
              Set Priority
            </Label>
            <Select name="priority" defaultValue={todo?.priority}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton />
        </Form>
      </Container>
    </div>
  );
}
