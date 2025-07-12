import {Router} from "express";
const router: Router = Router();
import * as topicController from "../../controllers/client/topic.controller";



router.get("/", topicController.index);



export default router;