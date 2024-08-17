import { Response } from "express";
import { CustomError } from "./error";

export const handleSuccess = (res: Response, status: number, data: any) => {
  res.status(status).json(data);
};

export const handleError = (res: Response, error: CustomError) => {
  res
    .status(error.getStatus() ? error.getStatus() : 500)
    .json(
      error.getErrorMessage()
        ? error.getErrorMessage()
        : "Internal server error!"
    );
};

export const sendData = (res: Response, data: any) => {
  return handleSuccess(res, 200, data);
};
