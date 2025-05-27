import {
  pgTable,
  pgPolicy,
  bigint,
  timestamp,
  text,
  foreignKey,
  primaryKey,
  serial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";

const createdAt = timestamp("created_at", {
  withTimezone: true,
  mode: "string",
})
  .defaultNow()
  .notNull();

export const categoriesTable = pgTable(
  "categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "categories_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        cache: 1,
      })
      .notNull(),
    createdAt,
    name: text().notNull(),
    image: text().notNull(),
  },
  () => [
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const projectsTable = pgTable(
  "projects",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "projects_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      cache: 1,
    }),
    createdAt,
    title: text().notNull(),
    url: text(),
    github: text(),
    description: text(),
    image: text().notNull(),
  },
  () => [
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const projectGalleryTable = pgTable("project_gallery", {
  id: serial("id").primaryKey(),
  image: text().notNull(),
  projectId: bigint({ mode: "number" }).notNull(),
  createdAt,
});

export const projectCategoriesTable = pgTable(
  "project_categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    projectId: bigint("project_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    categoryId: bigint("category_id", { mode: "number" }).notNull(),
    createdAt,
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categoriesTable.id],
      name: "public_project categories_category_id_fkey",
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.projectId],
      foreignColumns: [projectsTable.id],
      name: "public_project categories_project_id_fkey",
    }).onDelete("cascade"),
    primaryKey({
      columns: [table.projectId, table.categoryId],
      name: "project_categories_pkey",
    }),
    pgPolicy("public_access", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const projectCategoriesRelations = relations(
  projectCategoriesTable,
  ({ one }) => ({
    category: one(categoriesTable, {
      fields: [projectCategoriesTable.categoryId],
      references: [categoriesTable.id],
    }),
    project: one(projectsTable, {
      fields: [projectCategoriesTable.projectId],
      references: [projectsTable.id],
    }),
  })
);

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  projectCategories: many(projectCategoriesTable),
}));

export const projectsRelations = relations(projectsTable, ({ many }) => ({
  projectCategories: many(projectCategoriesTable),
  projectGallery: many(projectGalleryTable),
}));

export const projectGalleryRelations = relations(
  projectGalleryTable,
  ({ one }) => ({
    project: one(projectsTable, {
      fields: [projectGalleryTable.projectId],
      references: [projectsTable.id],
    }),
  })
);

export type ProjectTable = typeof projectsTable;
export type CategoryTable = typeof categoriesTable;
export type ProjectCategoryTable = typeof projectCategoriesTable;
export type ProjectGalleryTable = typeof projectGalleryTable;
