import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Edit, Ellipsis,  Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Todos } from "@/db/schema";
import Link from "next/link";

interface MoreOptionsProps {
  action: (formData: FormData) => Promise<void>;
  todo: typeof Todos.$inferSelect;
}

export default function MoreOptions({ action, todo }: MoreOptionsProps) {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>
              <span className="sr-only">More Options</span>
              <Ellipsis className="h-auto w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
            <Link href={`/todos/edit/${todo?.id}`}>
              <Button
                className="flex items-center justify-start gap-2 text-xs w-full"
                variant={"ghost"}
            
              >
               
             
                  <Edit className="h-auto w-4" /> Edit
               
              </Button>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button
                  className="flex items-center justify-start gap-2 text-xs w-full"
                  variant={"ghost"}
                >
                  <Trash className="h-auto w-4" />
                  Delete Todo
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              todo and remove the data from this account.
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <form action={action}>
                <input type="hidden" name="id" value={todo?.id} />

                <Button variant={"destructive"}>Delete Todo</Button>
              </form>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
