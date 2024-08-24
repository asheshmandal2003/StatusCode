import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { badRequestError } from "../util/error";
import { handleError } from "../util/response";
import { Role } from "@prisma/client";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/;

export const validateRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registerSchema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.base": "Email must be a string!",
          "string.empty": "Email is required!",
          "string.email": "Invalid email address!",
          "any.required": "Email is required!",
        }),
      password: Joi.string()
        .min(8)
        .max(32)
        .pattern(new RegExp(PASSWORD_REGEX))
        .required()
        .messages({
          "string.base": "Password must be a string!",
          "string.empty": "Password is required!",
          "string.min": "Password must have atleast {#limit} characters!",
          "string.max": "Password cannot have more than {#limit} characters!",
          "string.pattern.base":
            "Password must have atleast 1 digit, 1 special character, and 1 uppercase letter!",
          "any.required": "Password is required!",
        }),
      role: Joi.string()
        .required()
        .valid(Role.ADMIN, Role.BLOOD_BANK, Role.DONOR, Role.HOSPITAL)
        .messages({
          "string.base": "Role must be a string!",
          "string.empty": "Role is required!",
          "any.only": "Invalid Role!",
          "any.required": "Role is required!",
        }),
    });

    const { error } = registerSchema.validate(req.body);
    if (error) {
      badRequestError(error.message);
    }
    next();
  } catch (err: any) {
    return handleError(res, err);
  }
};
