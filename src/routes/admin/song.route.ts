import {Router} from "express";
const router: Router = Router();
import * as songController from "../../controllers/admin/song.controller";


router.get("/", songController.index);
router.get("/create", songController.create);


export default router;