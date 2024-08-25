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
      email: true,
      password: true,
      role: true,
      profile: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          phoneNo: true,
          latitude: true,
          longitude: true,
          avatar_url: true,
          avatar_public_id: true,
          hospitalName: true,
          bloodGroup: true,
          bloodBankName: true,
          address: {
            select: {
              address: true,
              district: true,
              city: true,
              state: true,
              zipCode: true,
            },
          },
        },
      },
    },
  });
};
