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

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("server listing on 3000");
});
