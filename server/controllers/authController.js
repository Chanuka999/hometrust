import User from "../models/User.js";
import bcryptjs, { hashSync } from "bcryptjs";

export const singup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({
      message: "data added successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
