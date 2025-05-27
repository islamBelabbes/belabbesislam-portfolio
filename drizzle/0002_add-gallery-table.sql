CREATE TABLE "project_gallery" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"projectId" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_categories" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;