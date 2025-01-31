import Container from "@/components/general/container";
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
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const todoId = 1;
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
              <TableRow>
                <TableCell className=" p-0 text-left">
                  <Link
                    href={`/todos/${todoId}`}
                    className="font-semibold p-4 block "
                  >
                    31/01/2025
                  </Link>
                </TableCell>
                <TableCell className="text-left  p-0">
                  <Link
                    href={`/todos/${todoId}`}
                    className="font-semibold p-4 block"
                  >
                    Learn Nextjs
                  </Link>
                </TableCell>
                <TableCell className="text-center  p-0">
                  <Link href={`/todos/${todoId}`} className=" block p-4">
                    <Badge className="bg-green-500 rounded-full">High </Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-right p-0">
                  <Link href={`/todos/${todoId}`} className="block p-4">
                    Incomplete
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Container>
    </div>
  );
}
