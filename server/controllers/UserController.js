import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";
export const test = (req, res) => {
  res.json({
    message: "get requestedd",
  });
};

//update user

export const uppdateUser = async (req, res, next) => {
  if (req.user.id != req.params.id) {
    return res.status(401).json("you can update only your account");
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 12);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(401).json("error updating");
  }
};
