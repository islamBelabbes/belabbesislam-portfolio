import {
  pgTable,
  pgPolicy,
  bigint,
  timestamp,
  text,
  foreignKey,
  primaryKey,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm/relations";

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
        maxValue: 9223372036854775807,
        cache: 1,
      })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text().notNull(),
    image: text().notNull(),
  },
  (table) => [
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
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    title: text().notNull(),
    url: text(),
    description: text(),
    image: text().notNull(),
  },
  (table) => [
    pgPolicy("Enable read access for all users", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`true`,
    }),
  ]
);

export const projectCategoriesTable = pgTable(
  "project_categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    projectId: bigint("project_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    categoryId: bigint("category_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.categoryId],
      foreignColumns: [categoriesTable.id],
      name: "public_project categories_category_id_fkey",
    }),
    foreignKey({
      columns: [table.projectId],
      foreignColumns: [projectsTable.id],
      name: "public_project categories_project_id_fkey",
    }),
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
}));

export type ProjectTable = typeof projectsTable;
export type CategoryTable = typeof categoriesTable;
export type ProjectCategoryTable = typeof projectCategoriesTable;
