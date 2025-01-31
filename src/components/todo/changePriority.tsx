import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { PRIORITY_OPTIONS } from "@/data";
import { Todos } from "@/db/schema";

interface ChangePriorityProps {
  action: (formData: FormData) => Promise<void>;
  todo: typeof Todos.$inferSelect;
}

export default function ChangePriority({ action, todo }: ChangePriorityProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            Change Priority
            <ChevronDown className="w-4 h-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {PRIORITY_OPTIONS.map((priority) => (
            <DropdownMenuItem key={priority.id}>
              <form action={action}>
                <input type="hidden" name="id" value={todo.id} />
                <input type="hidden" name="priority" value={priority.name} />
                <button className="capitalize"> {priority.name}</button>
              </form>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
