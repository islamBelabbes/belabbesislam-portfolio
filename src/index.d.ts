import "@tanstack/react-table";

import { type RowData } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface TableMeta<TData extends RowData> {
    handleDelete?: (id: string) => void;
  }
}
