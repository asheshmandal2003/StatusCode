import { Response } from "express";
import { CustomError } from "./error";

export const handleSuccess = (res: Response, status: number, data: any) => {
  res.status(status).json(data);
};

export const handleError = (res: Response, error: CustomError) => {
  res
    .status(error.status || 500)
    .json(error.message || "Internal server error!");
};

export const sendData = (res: Response, data: any) => {
  return handleSuccess(res, 200, data);
};
