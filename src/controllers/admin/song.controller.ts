
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

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    // Lấy các trường text từ body, nếu thiếu thì gán chuỗi rỗng (để tránh undefined)
    const { title = "", topicId = "", singerId = "", status = "", description = "" } = req.body;

    // Ép kiểu req.files để TypeScript hiểu đây là object có key là string, value là mảng file
    // Đây là kiểu phù hợp khi bạn dùng multer.fields([{ name: "audio" }, { name: "avatar" }])
    const files = req.files as { [key: string]: Express.Multer.File[] };

    // Lấy filename của file audio (nếu có), ngược lại gán ""
    const audio = files?.audio?.[0]?.filename || "";

    // Lấy filename của file avatar (nếu có), ngược lại gán ""
    const avatar = files?.avatar?.[0]?.filename || "";

    // Nếu thiếu 1 trong 2 file => trả về lỗi 400 (Bad Request)
    if (!audio || !avatar) {
      res.status(400).send("Thiếu file audio hoặc avatar");
      return;
    }

    // Gom tất cả dữ liệu lại thành một object để tạo mới
    const newSong = {
      title,
      topicId,
      singerId,
      status,
      description,
      audio,
      avatar
    };

    // Tạo mới document trong MongoDB từ model Song
    const song = new Song(newSong);

    // Lưu vào database
    await song.save();

    // Sau khi tạo xong, chuyển hướng người dùng về trang danh sách bài hát
    res.redirect("/admin/songs");
  } catch (error) {
    // Nếu có lỗi xảy ra, log lỗi ra console (nên có để debug)
    console.error("Lỗi tạo bài hát:", error);

    // Trả về lỗi 500 (Internal Server Error)
    res.status(500).send("Có lỗi xảy ra trên server");
  }
};