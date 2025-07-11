import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
  {
    title: String,
    avatar: String,
    status: String,
    description: String,
    slug: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // Dùng để thêm thời gian tạo và cập nhật sản phẩm tự động
    timestamps: true,
  }
);
const Topic = mongoose.model("Topic", topicSchema, "topics");
export default Topic;
