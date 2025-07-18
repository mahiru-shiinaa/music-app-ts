
import { Request, Response } from "express";
import Song from "../../models/client/song.model";
import Topic from "../../models/client/topic.model";
import Singer from "../../models/client/singer.model";
export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const songs = await Song.find({ deleted: false });
    res.render("admin/pages/songs/index", {pageTitle: "Danh sách Bài hát",  songs });
  } catch (error) {
    
  }
}

export const create = async (req: Request, res: Response): Promise<void> => {

  try {
    const topics = await Topic.find({ deleted: false, status: "active" }).select("title");
    const singers = await Singer.find({ deleted: false, status: "active" }).select("fullName avatar");

    res.render("admin/pages/songs/create", {pageTitle: "Tạo bài hát", topics, singers });
    
  } catch (error) {
    
  }
  
}