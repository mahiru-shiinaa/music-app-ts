import { Request, Response } from "express";
import FavoriteSong from "../../models/client/favorite-song.model";
import Song from "../../models/client/song.model";
import Singer from "../../models/client/singer.model";

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    // Lấy tất cả các bài hát yêu thích chưa bị xóa
    const favoriteSongs = await FavoriteSong.find({ deleted: false }).lean();

    // Dùng Promise.all để chạy song song các truy vấn bên trong map
    // map() tạo ra 1 mảng các Promise, mỗi phần tử là 1 lời hứa sẽ trả về thông tin bài hát + ca sĩ
    const songInfos = await Promise.all(
      favoriteSongs.map(async (item) => {
        // Tìm thông tin bài hát tương ứng với từng bài hát yêu thích
        const infoSong = await Song.findOne({
          _id: item.songId,
          deleted: false,
        })
          .select("title slug singerId avatar")
          .lean();

        // Nếu không tìm thấy bài hát → bỏ qua
        if (!infoSong) return null;

        // Tìm thông tin ca sĩ của bài hát
        const infoSinger = await Singer.findOne({
          _id: infoSong.singerId,
          deleted: false,
        })
          .select("fullName avatar")
          .lean();

        // ⚠️ Quan trọng: Phải return 1 object thì Promise.all mới thu được kết quả
        // Nếu không có return thì phần tử sẽ là undefined → không có dữ liệu
        return {
          song: infoSong,
          singer: infoSinger,
        };
      })
    );

    // Bỏ qua các phần tử null (do không tìm thấy bài hát)
    const filteredSongInfos = songInfos.filter((item) => item !== null);
    console.log('filteredSongInfos', filteredSongInfos);
    // Trả kết quả ra view Pug
    res.render("client/pages/favorite-songs/index", {
      pageTitle: "Bài hát yêu thích",
      songInfos: filteredSongInfos,
    });
  } catch (error) {
    console.log(error);
  }
};
