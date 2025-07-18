import { Router } from "express";
import multer from "multer";
const router: Router = Router();
import * as songController from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
const upload = multer();

router.get("/", songController.index);
router.get("/create", songController.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  songController.createPost
);

export default router;
