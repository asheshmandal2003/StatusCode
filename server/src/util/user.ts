import { User } from "../types/user";
import { prisma } from "./prisma";

export const doesExist = async (email: string): Promise<Boolean> => {
  return (
    (await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })) !== null
  );
};

export const getUserByEmail = async (
  email: string
): Promise<User | null | undefined> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      role: true,
    },
  });
};
