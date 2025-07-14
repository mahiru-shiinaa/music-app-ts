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
    res.render("client/pages/songs/list.pug", {
      pageTitle: topic.title || "",
      songs,
      topic,
    });
  } catch (error) {
    console.log(error);
  }
};

export const detail = async (req: Request, res: Response): Promise<void> => {
  try {
    const song = await Song.findOne({
      slug: req.params.slugSong,
      status: "active",
      deleted: false,
    });
    if (!song) {
      res.status(404).send("Song not found");
      return;
    }
    const singer = await Singer.findOne({
      _id: song.singerId,
      deleted: false,
    }).select("fullName avatar");
    if (!singer) {
      res.status(404).send("Singer not found");
      return;
    }
    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false,
    }).select("title");
    if (!topic) {
      res.status(404).send("Topic not found");
      return;
    }

    res.render("client/pages/songs/detail.pug", {
      pageTitle: song.title || "",
      song,
      singer,
      topic,
    });
  } catch (error) {
    console.log(error);
  }
};

export const like = async (req: Request, res: Response): Promise<void> => {
  try {
    const idSong: string = req.params.idSong;
    const typeLike: string = req.params.typeLike;
    const song = await Song.findOne({
      _id: idSong,
      deleted: false,
    });
    if (!song) {
      res.status(404).send("Song not found");
      return;
    }
    // if(song.like) song.like += 1;
    // else song.like = 1;
    // await song.save();
    if (typeLike === "like") {
      if (song.like) song.like += 1;
    } else {
      if (song.like) song.like -= 1;
    }
    await song.save();
    res.json({
      code: 200,
      message: "Thích bài hát thành công",
      like: song.like,
    });
  } catch (error) {
    console.log(error);
  }
};
