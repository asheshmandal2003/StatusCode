import { Request, Response } from "express";
import { getProfilesOnMap } from "../util/profile";
import { handleError, handleSuccess, sendData } from "../util/response";
import { badRequestError } from "../util/error";
import { prisma } from "../util/prisma";
import { uploadImg } from "../util/cloudinary";

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
    if (!req.file) {
      badRequestError("User ID is required!");
    }
    const { url, publicId } = await uploadImg(req.file?.buffer as Buffer);
    const {
      firstName,
      lastName,
      phoneNo,
      bloodGroup,
      latitude,
      longitude,
      address,
      city,
      district,
      state,
      zipCode,
    } = req.body;

    const lat: number = parseFloat(latitude);
    const long: number = parseFloat(longitude);
    const zip: number = parseInt(zipCode);

    if (isNaN(lat) || isNaN(long)) {
      badRequestError("Latitude and Longitude must be numbers");
    }

    console.log(typeof lat, typeof long);

    const profile = await prisma.profile.create({
      data: {
        userId,
        firstName,
        lastName,
        avatar_url: url as string,
        avatar_public_id: publicId as string,
        phoneNo,
        bloodGroup,
        latitude: lat,
        longitude: long,
        address: {
          create: {
            address,
            city,
            district,
            state,
            zipCode: zip,
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

export const createHospitalProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const {
      hospitalName,
      phoneNo,
      latitude,
      longitude,
      address,
      city,
      district,
      state,
      zipCode,
    } = req.body;

    if (!req.file) {
      badRequestError("User ID is required!");
    }
    const { url, publicId } = await uploadImg(req.file?.buffer as Buffer);

    const profile = await prisma.profile.create({
      data: {
        userId,
        hospitalName,
        avatar_url: url as string,
        avatar_public_id: publicId as string,
        phoneNo,
        latitude,
        longitude,
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
