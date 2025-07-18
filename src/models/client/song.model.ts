import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const songSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    description: String,
    singerId: String,
    listen: {
      type: Number,
      default: 0,
    },
    topicId: String,
    like: Number,
    lyrics: String,
    audio: String,
    status: String,
    slug: {
      type: String,
      slug: "title",
      unique: true, // Slug là duy nhất
      slugPaddingSize: 4, // Nếu trùng, nó thêm -0001, -0002...
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema, "songs");

export default Song;
