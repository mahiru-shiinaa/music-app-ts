import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
 import * as database from "./config/database";

import cookieParser from "cookie-parser";

// Khai báo app
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

// Cấu hình .env
dotenv.config();
//Kết nối Database
database.connect();


// Dùng khi cài bug
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware để đọc body từ client, không cần body-parser nâng cao
app.use(express.json()); // Đọc JSON từ client (axios/fetch gửi lên)
app.use(express.urlencoded({ extended: true })); // Nếu dùng form HTML gửi lên

//  dùng khi muốn res.cookie
app.use(cookieParser());



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
