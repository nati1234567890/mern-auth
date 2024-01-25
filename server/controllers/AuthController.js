import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfuly" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
