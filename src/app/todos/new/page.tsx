"use client";
import Container from "@/components/general/container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Form from "next/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SubmitButton from "@/components/general/submitButton";
import { SyntheticEvent, useState } from "react";
import { createTodoAction } from "@/app/actions";

export default function NewTodoPage() {
  const [state, setState] = useState("ready");

  async function handleOnSubmit(e: SyntheticEvent) {
    if (state === "pending") {
      e.preventDefault();
      return;
    }
    setState("pending");
  }

  return (
    <div className="w-full">
      <Container>
        <h3 className="text-2xl font-bold mb-6">Create Todo</h3>
        <Form
          action={createTodoAction}
          onSubmit={handleOnSubmit}
          className="w-full max-w-xl flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="font-medium text-lg">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Title of your todo"
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
            />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <Label htmlFor="priority" className="font-medium text-lg">
              Set Priority
            </Label>
            <Select name="priority">
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
