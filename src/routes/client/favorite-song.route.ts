import {Router} from "express";
const router: Router = Router();
import * as favoriteSongController from "../../controllers/client/favorite-song.controller";



router.get("/", favoriteSongController.index);




export default router;