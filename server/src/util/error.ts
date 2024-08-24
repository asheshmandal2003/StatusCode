import e from "express";

export class CustomError extends Error {
  public status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const throwError = (status: number, message: string): CustomError => {
  throw new CustomError(status, message);
};

export const notFoundError = (message: string = "Page Not Found!"): void => {
  throwError(404, message);
};

export const badRequestError = (message: string = "Bad Request!"): void => {
  throwError(400, message);
};

export const unauthorizedError = (message: string = "Access Denied!"): void => {
  throwError(401, message);
};
