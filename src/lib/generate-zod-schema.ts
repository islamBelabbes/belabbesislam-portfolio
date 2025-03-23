import { Table } from "drizzle-orm";
import { createSchemaFactory } from "drizzle-zod";

export default class ZodGenerated<T extends Table> {
  private factory: ReturnType<typeof createSchemaFactory>;
  private table: T;

  constructor(table: T) {
    this.factory = createSchemaFactory();
    this.table = table;
  }

  get insert() {
    return this.factory.createInsertSchema(this.table);
  }

  get update() {
    return this.factory.createUpdateSchema(this.table);
  }

  get select() {
    return this.factory.createSelectSchema(this.table);
  }
}
