import {
  pgTable,
  timestamp,
  serial,
  text,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

// import { PRIORITY_OPTIONS } from "@/data";
// export type Priority = (typeof PRIORITY_OPTIONS)[number]["id"];
// const priorities = PRIORITY_OPTIONS.map((priority) => priority.id) as Array<Priority>

export const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const Todos = pgTable("todos", {
  createTs: timestamp("createTs").defaultNow().notNull(),
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: priorityEnum("priority").notNull(),
  completed: boolean("completed").default(false),
  userId: text("userId").notNull(),
});
