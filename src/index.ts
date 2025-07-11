import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import * as database from "./config/database";
// import mainV1Routes from "./api/v1/routes/index.route";
import cors from "cors";
import cookieParser from "cookie-parser";




dotenv.config();
//database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Dùng khi cài bug
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware để đọc body từ client, không cần body-parser nâng cao
app.use(express.json()); // Đọc JSON từ client (axios/fetch gửi lên)
app.use(express.urlencoded({ extended: true })); // Nếu dùng form HTML gửi lên

app.use(cors());
app.use(cookieParser());

//mainV1Routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
