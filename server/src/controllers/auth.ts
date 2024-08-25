import { Request, Response } from "express";
import { prisma } from "../util/prisma";
import { createHash, compareHash } from "../util/password";
import { badRequestError, unauthorizedError } from "../util/error";
import { handleSuccess, handleError, sendData } from "../util/response";
import { doesExist, getUserByEmail } from "../util/user";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const user = await doesExist(email);
    if (user) {
      badRequestError("User already exists!");
    }

    const hash = await createHash(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hash,
        role,
      },
    });

    const resData = {
      id: newUser.id,
      firstName,
      lastName,
      email,
      role,
    };

    return handleSuccess(res, 201, resData);
  } catch (error: any) {
    return handleError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      badRequestError("User does not exist!");
    }

    console.log(user);

    const isCorrect = await compareHash(password, user?.password as string);
    if (!isCorrect) {
      unauthorizedError("Invalid password!");
    }

    const resData = {
      id: user?.id,
      email: user?.email,
      role: user?.role,
      profile: user?.profile,
    };
    return sendData(res, resData);
  } catch (error: any) {
    return handleError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};
