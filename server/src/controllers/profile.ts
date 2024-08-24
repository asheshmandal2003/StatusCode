import { Request, Response } from "express";
import { getProfilesOnMap } from "../util/profile";
import { handleError, handleSuccess, sendData } from "../util/response";
import { badRequestError } from "../util/error";
import { prisma } from "../util/prisma";

export const getProfilesForMap = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, bloodGroup, state } = req.body;
    const { reqDistance } = req.query;
    const distance = Number(reqDistance);
    if (!distance) {
      badRequestError("Enter a valid distance!");
    }
    const profiles = await getProfilesOnMap(
      distance,
      latitude,
      longitude,
      bloodGroup,
      state
    );
    return sendData(res, profiles);
  } catch (error: any) {
    return handleError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};

export const createProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const {
      firstName,
      lastName,
      avatar_url,
      avatar_public_id,
      phoneNo,
      bloodGroup,
      latitude,
      longitude,
      address,
      city,
      district,
      state,
      zipCode,
      dateofBirth,
    } = req.body;

    const profile = await prisma.profile.create({
      data: {
        userId,
        firstName,
        lastName,
        avatar_url,
        avatar_public_id,
        phoneNo,
        bloodGroup,
        latitude,
        longitude,
        dateofBirth,
        address: {
          create: {
            address,
            city,
            district,
            state,
            zipCode,
          },
        },
      },
    });
    return handleSuccess(res, 201, profile);
  } catch (error: any) {
    return handleError(res, error);
  } finally {
    await prisma.$disconnect();
  }
};
