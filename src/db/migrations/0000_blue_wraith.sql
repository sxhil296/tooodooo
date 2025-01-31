CREATE TABLE "todos" (
	"createTs" timestamp DEFAULT now() NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"priority" "priority" NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"userId" text NOT NULL
);
