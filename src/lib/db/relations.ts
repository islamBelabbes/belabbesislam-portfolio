import { relations } from "drizzle-orm/relations";
import { categories, projectCategories, projects } from "./schema";

export const projectCategoriesRelations = relations(projectCategories, ({one}) => ({
	category: one(categories, {
		fields: [projectCategories.categoryId],
		references: [categories.id]
	}),
	project: one(projects, {
		fields: [projectCategories.projectId],
		references: [projects.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	projectCategories: many(projectCategories),
}));

export const projectsRelations = relations(projects, ({many}) => ({
	projectCategories: many(projectCategories),
}));