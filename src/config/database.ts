import mongoose from "mongoose";

export const connect = async () : Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
