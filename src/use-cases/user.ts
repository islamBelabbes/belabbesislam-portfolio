import { userDtoMapper } from "@/dto/users";
import { currentUser } from "@clerk/nextjs/server";

export const getCurrentUserUseCase = async () => {
  const user = await currentUser();
  return user ? userDtoMapper(user) : null;
};
