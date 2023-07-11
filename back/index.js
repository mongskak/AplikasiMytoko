import express from "express";
import Users from "./models/userModels.js";
import Products from "./models/Products.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index.js";
import db from "./config/Database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("database connected successfully");
} catch (error) {
  console.log(error);
}

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
//Products.sync();
//Users.sync();
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT, () =>
  console.log("server up and running on port " + process.env.PORT)
);
