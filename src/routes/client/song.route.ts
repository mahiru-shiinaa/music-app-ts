import {Router} from "express";
const router: Router = Router();
import * as songController from "../../controllers/client/song.controller";



router.get("/:slugTopic", songController.index);



export default router;