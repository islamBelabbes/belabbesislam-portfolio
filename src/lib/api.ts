type client<T> = T;

type TRemoveEntry<T> = {
  client: client<T>;
  table: "projects" | "categories";
  id: number;
};

const removeEntry = <T>({ client, table, id }: TRemoveEntry<T>) => {};
