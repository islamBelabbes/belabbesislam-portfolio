ALTER TABLE "project_categories" DROP CONSTRAINT "public_project categories_category_id_fkey";
--> statement-breakpoint
ALTER TABLE "project_categories" DROP CONSTRAINT "public_project categories_project_id_fkey";
--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "name" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "image" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "title" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "image" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "project_categories" ADD CONSTRAINT "public_project categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_categories" ADD CONSTRAINT "public_project categories_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;