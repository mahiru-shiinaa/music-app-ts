import {Router} from "express";
const router: Router = Router();
import * as searchController from "../../controllers/client/search.controller";



router.get("/result", searchController.result);




export default router;