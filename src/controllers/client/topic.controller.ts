import { Request, Response } from "express";
import Topic from "../../models/client/topic.model";
export const index = async (req: Request, res: Response) : Promise<void> => {
    try {
        const topics = await Topic.find({deleted: false});
       res.render("client/pages/topics/index", { topics, pageTitle: "Chủ đề bài hát" });
    } catch (error) {
        console.log(error);
    }
}