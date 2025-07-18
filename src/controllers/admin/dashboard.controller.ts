
import { Request, Response } from "express";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {

    res.render("admin/pages/dashboard/index");
    
  } catch (error) {
    
  }
}