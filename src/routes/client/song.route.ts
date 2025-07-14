import {Router} from "express";
const router: Router = Router();
import * as songController from "../../controllers/client/song.controller";



router.get("/:slugTopic", songController.index);
router.get("/detail/:slugSong", songController.detail);
router.patch("/like/:typeLike/:idSong", songController.like);



export default router;