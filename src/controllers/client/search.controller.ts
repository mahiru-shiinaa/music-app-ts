import { Request, Response } from "express";
import Song from "../../models/client/song.model";
import Singer from "../../models/client/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";
export const result = async (req: Request, res: Response): Promise<void> => {
  try {
    const keyword: string = `${req.query.keyword}`;
    let newSongs: Array<any> = [];


    if (keyword) {
      const keywordReg = new RegExp(keyword, "i");

      // Tạo ra slug không dấu, thêm dấu - thay dấu cách
      const stringSlug = convertToSlug(keyword);
      const stringSlugReg = new RegExp(stringSlug, "i");
      const songs = await Song.find({ $or: [{ title: keywordReg }, { slug: stringSlugReg }], deleted: false }).lean().select("title singerId id avatar like");
      newSongs = await Promise.all(
        songs.map(async (song) => {
          const singer = await Singer.findOne({ _id: song.singerId }).select("fullName avatar");
          return { ...song, singer };
        })
      );
    }
    res.render("client/pages/search/result", {
      pageTitle: "Kết quản tìm kiếm: " + keyword,
      keyword,
      songs: newSongs,
    });
  } catch (error) {
     console.log("Lỗi khi tìm kiếm bài hát:", error);
    res.status(500).send("Đã xảy ra lỗi server");
  }
};
