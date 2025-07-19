import { Router } from "express";
import multer from "multer";
const router: Router = Router();
import * as songController from "../../controllers/admin/song.controller";
import * as uploadCloud from "../../middlewares/admin/uploadCloud.middlewares";
const upload = multer();

router.get("/", songController.index);
router.get("/create", songController.create);
router.get("/edit/:id", songController.edit);
router.patch(
  "/edit/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  songController.editPatch
);
router.post(
  "/create",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  uploadCloud.uploadFields,
  songController.createPost
);

export default router;
