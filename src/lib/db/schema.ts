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

export const categoriesTable = pgTable(
  "categories",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
      name: "categories_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    name: text().default("").notNull(),
    image: text().default("").notNull(),
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
    title: text().default("").notNull(),
    url: text(),
    description: text(),
    image: text().default("").notNull(),
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
