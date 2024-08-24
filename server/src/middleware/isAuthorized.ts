import { NextFunction, Request, Response } from "express";
import { prisma } from "../util/prisma";
import { unauthorizedError } from "../util/error";
import { handleError } from "../util/response";

export const isDonor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const donor = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (donor?.role !== "DONOR") {
      unauthorizedError("You are not authorized to perform this action");
    }

    next();
  } catch (error: any) {
    return handleError(res, error);
  }
};

export const isHospital = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const hospital = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    });

    if (hospital?.role !== "HOSPITAL") {
      unauthorizedError("You are not authorized to perform this action");
    }

    next();
  } catch (error: any) {
    return handleError(res, error);
  }
};
