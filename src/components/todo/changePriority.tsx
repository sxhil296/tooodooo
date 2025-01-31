import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { PRIORITY_OPTIONS } from "@/data";

interface ChangePriorityProps {
  action?: (formData: FormData) => Promise<void>;
}

export default function ChangePriority({ action }: ChangePriorityProps) {
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
              <form>
                <input type="hidden" name="id" value={priority.id} />
                <input type="hidden" name="status" value={priority.id} />
                <button className="capitalize"> {priority.name}</button>
              </form>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
