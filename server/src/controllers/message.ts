import { Request, Response } from "express";
import { sendEmail } from "../util/sendMail";
import { handleError, sendData } from "../util/response";

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const {
      to,
      firstName,
      lastName,
      phoneNo,
      address,
      district,
      state,
      pin,
      bloodGroup,
    } = req.body;
    const message = `Name: ${firstName} ${lastName}\nPhone No: ${phoneNo}\nAddress: ${address}, ${district}, ${state}, ${pin}\n Required Blood Group: ${bloodGroup}`;
    await sendEmail(to, "Blood Required!", message);
    return sendData(res, "Message sent successfully");
  } catch (err: any) {
    return handleError(res, err);
  }
};

export const sendMailToDonor = async (req: Request, res: Response) => {
  try {
    const { to, firstName, lastName, hospitalName } = req.body;
    console.log(to, firstName, lastName, hospitalName);
    const message = `Hello ${firstName} ${lastName},\n\nYou have been requested to donate blood at ${hospitalName}. Please contact the hospital for more details.`;
    await sendEmail(to, "Blood Required!", message);
    return sendData(res, "Message sent successfully");
  } catch (err: any) {
    return handleError(res, err);
  }
};
