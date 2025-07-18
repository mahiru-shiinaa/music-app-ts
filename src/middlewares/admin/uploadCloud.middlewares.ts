import  uploadToCloudinary  from "../../helpers/uploadCloudinary";
import { Request, Response, NextFunction } from "express";
export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer); // THÊM AWAIT
    req.body[req.file.fieldname] = result;
  }
  next();
};



