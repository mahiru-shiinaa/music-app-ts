
import { Express } from "express";
import dashBoardRoutes from './dashboard.route';
import topicRoutes from './topic.route';
import songRoutes from './song.route';
import uploadRoutes from './upload.route';
import { systemConfig } from "../../config/config";
const adminRoutes = (app: Express) : void => {

  const PATH_ADMIN = systemConfig.prefixAdmin;
   app.use(`${PATH_ADMIN}/dashboard`, dashBoardRoutes);
   app.use(`${PATH_ADMIN}/topics`, topicRoutes);
   app.use(`${PATH_ADMIN}/songs`, songRoutes);
   app.use(`${PATH_ADMIN}/upload`, uploadRoutes);


};

export default adminRoutes;
