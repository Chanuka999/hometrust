import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRouter from "./routes/userRouter.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log("connection failed" + err);
  });

const app = express();

app.use("/api/user", useRouter);

app.listen(3000, () => {
  console.log("server listing on 3000");
});
