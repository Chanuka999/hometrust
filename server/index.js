import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import useRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

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
app.use(express.json());

app.use("/api/user", useRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("server listing on 3000");
});
