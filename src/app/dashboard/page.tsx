import Container from "@/components/general/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { Todos } from "@/db/schema";
import { cn } from "@/lib/utils";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

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
        <div>
          <Table>
            <TableCaption>A list of your recent todos.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] p-4">Date</TableHead>
                <TableHead className="p-4">Todo</TableHead>
                <TableHead className="text-center p-4">Priority</TableHead>
                <TableHead className="text-right p-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todos.map((todo) => (
                <TableRow>
                  <TableCell className=" p-0 text-left">
                    <Link
                      href={`/todos/${todo?.id}`}
                      className="font-semibold p-4 block "
                    >
                      {new Date(todo?.createTs).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left  p-0">
                    <Link
                      href={`/todos/${todo?.id}`}
                      className="font-semibold p-4 block"
                    >
                      {todo?.title}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center  p-0">
                    <Link href={`/todos/${todo?.id}`} className=" block p-4">
                      <Badge
                        className={cn(
                          "rounded-full capitalize",
                          todo?.priority === "low" && "bg-green-500 ",
                          todo?.priority === "medium" && "bg-yellow-500 ",
                          todo?.priority === "high" && "bg-red-500"
                        )}
                      >
                        {todo?.priority}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    <Link href={`/todos/${todo?.id}`} className="block p-4">
                      <Checkbox checked={todo?.completed === true} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
