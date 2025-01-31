import {
  pgTable,
  timestamp,
  serial,
  text,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

const priorityEnum = pgEnum("priority", ["low", "medium", "high"]);

export const Todos = pgTable("todos", {
  createTs: timestamp("createTs").defaultNow().notNull(),
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  priority: priorityEnum("priority").notNull(),
  completed: boolean("completed").default(false).notNull(),
  userId: text("userId").notNull(),
});
