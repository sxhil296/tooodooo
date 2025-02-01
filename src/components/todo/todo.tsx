"use client";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import ChangePriority from "./changePriority";
import { changePriorityAction, deleteTodoAction } from "@/app/actions";
import { Todos } from "@/db/schema";
import MoreOptions from "./moreOptions";
import Container from "../general/container";
import { useOptimistic } from "react";

interface TodoProps {
  todo: typeof Todos.$inferSelect;
}

export default function Todo({ todo }: TodoProps) {
  const [currentPriority, setCurrentPriority] = useOptimistic(
    todo.priority,
    (priority, newPriority) => {
      return newPriority as "low" | "medium" | "high";
    }
  );

  async function handleOnPriorityUpdate(formData: FormData) {
    const originalPriority = currentPriority;
    setCurrentPriority(formData.get("priority") as string);
    try {
      await changePriorityAction(formData);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error updating status:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      setCurrentPriority(originalPriority);
    }
  }

  return (
    <div className="w-full">
      <Container>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* <BackButton /> */}
            <h4 className="text-xl font-bold">{todo.title}</h4>
            <Badge
              className={cn(
                "rounded-full capitalize",
                currentPriority === "low" && "bg-green-500",
                currentPriority === "medium" && "bg-yellow-500",
                currentPriority === "high" && "bg-red-500"
              )}
            >
              {currentPriority}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ChangePriority action={handleOnPriorityUpdate} todo={todo} />
            <MoreOptions action={deleteTodoAction} todo={todo} />
          </div>
        </div>

        <div className="max-w-sm">
          <p className="text-lg font-medium mt-4">{todo.description}</p>
        </div>
      </Container>
    </div>
  );
}
