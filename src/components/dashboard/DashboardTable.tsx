"use client";
import { toggleCompletedAction } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Todos } from "@/db/schema";

import { cn } from "@/lib/utils";

import { Square, SquareCheck } from "lucide-react";
import Link from "next/link";
import { useOptimistic } from "react";

interface DashboardTableProps {
  todos: (typeof Todos.$inferSelect)[];
}

export default function DashboardTable({ todos }: DashboardTableProps) {
  const [currentStatus, setCurrentStatus] = useOptimistic(
    todos.map(todo => todo.completed),
    (status, newStatus) => {
      return newStatus as boolean[];
    }
  );

  async function handleIsCompleted(formData: FormData) {
    const originalStatus = currentStatus;
    setCurrentStatus(formData.get("id") as string);
    try {
      await toggleCompletedAction(formData);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating status:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      setCurrentStatus(originalStatus);
    }
  }
  return (
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
            <TableRow key={todo?.id}>
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
                <form className="block p-4" action={handleIsCompleted}>
                  <input type="hidden" name="id" value={todo?.id} />

                  <Button variant={"ghost"} title="Toggle Completed">
                    {todo?.completed ? (
                      <SquareCheck className="w-6 h-auto" />
                    ) : (
                      <Square className="w-6 h-auto" />
                    )}
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
