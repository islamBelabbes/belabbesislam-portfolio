import { User as ClerkUser } from "@clerk/nextjs/server";

export const userDtoMapper = (user: ClerkUser) => {
  const { publicMetadata, id } = user;
  return {
    id,
    isAdmin: Boolean(publicMetadata.isAdmin),
  };
};

export type User = ReturnType<typeof userDtoMapper>;
