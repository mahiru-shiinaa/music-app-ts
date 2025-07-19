import { Router } from "express";
import multer from "multer";
const router: Router = Router();
const upload = multer();
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
import * as uploadController from "../../controllers/admin/upload.controller";

router.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  uploadController.index
);

export default router;
