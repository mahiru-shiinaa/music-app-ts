import { Request, Response } from "express";
import Topic from "../../models/client/topic.model";
import Song from "../../models/client/song.model";
import Singer from "../../models/client/singer.model";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    interface SongWithSinger {
      _id: string;
      avatar?: string;
      title?: string;
      slug?: string;
      singerId: string;
      like?: number;
      singerInfo?: any; // hoặc bạn có thể dùng kiểu Singer nếu có
    }

    const topic = await Topic.findOne({
      slug: req.params.slugTopic,
      deleted: false,
    });
    if (!topic) {
      res.status(404).send("Topic not found");
      return;
    }
    const songs =
      ((await Song.find({
        topicId: topic.id,
        status: "active",
        deleted: false,
      })
        .select("avatar title slug singerId like")
        .lean()) as unknown as SongWithSinger[]) || [];
    
    if (!songs) {
      res.status(404).send("Song not found");
      return;
    }

    for (const item of songs) {
      const singer = await Singer.findOne({
        _id: item.singerId,
        status: "active",
        deleted: false,
      });
      item.singerInfo = singer;
    }
    console.log('singerInfo', songs);
    res.render("client/pages/songs/list.pug", { pageTitle: topic.title || "", songs, topic });
  } catch (error) {
    console.log(error);
  }
};
